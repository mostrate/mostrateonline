import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import HeroPreview from "./HeroPreview";

function mockMedia(desktop: boolean, reducedMotion = false) {
  vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
    matches: query.includes("min-width") ? desktop : reducedMotion,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })));
}

describe("HeroPreview", () => {
  beforeEach(() => { vi.useFakeTimers(); mockMedia(true); });
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

  it("mantiene cada modelo durante doce segundos", () => {
    render(<HeroPreview />);
    act(() => vi.advanceTimersByTime(11999));
    expect(screen.getByRole("button", { name: "Profesional" }).getAttribute("aria-pressed")).toBe("true");
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("button", { name: "Comercio" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("mantiene el modelo seleccionado y sincroniza la dirección al terminar la carga", () => {
    const { container } = render(<HeroPreview />);
    act(() => vi.advanceTimersByTime(11000));
    fireEvent.click(screen.getByRole("button", { name: "Bienestar" }));
    expect(screen.getByRole("button", { name: "Bienestar" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("estudiorivas.com")).toBeDefined();
    const next = Array.from(container.querySelectorAll("picture")).filter((picture) => picture.querySelector("source")?.getAttribute("srcset")?.includes("bienestar"));
    expect(next).toHaveLength(2);
    fireEvent.load(next[0].querySelector("img")!);
    expect(next[0].querySelector("img")?.className).toContain("opacity-0");
    fireEvent.load(next[1].querySelector("img")!);
    expect(next.every((picture) => picture.querySelector("img")?.className.includes("opacity-100"))).toBe(true);
    expect(screen.getByText("nucleotraining.com.ar")).toBeDefined();
    act(() => vi.advanceTimersByTime(12000));
    expect(screen.getByRole("button", { name: "Profesional" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("pausa al entrar con el puntero y reanuda al salir", () => {
    render(<HeroPreview />);
    const simulator = screen.getByRole("complementary");
    fireEvent.mouseEnter(simulator);
    fireEvent.click(screen.getByRole("button", { name: "Profesional" }));
    act(() => vi.advanceTimersByTime(24000));
    expect(screen.getByRole("button", { name: "Profesional" }).getAttribute("aria-pressed")).toBe("true");
    expect(simulator.className).toContain("hero-preview-paused");
    fireEvent.mouseLeave(simulator);
    act(() => vi.advanceTimersByTime(12000));
    expect(screen.getByRole("button", { name: "Comercio" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("pausa mientras se navega con teclado y reanuda al salir", () => {
    render(<HeroPreview />);
    const button = screen.getByRole("button", { name: "Profesional" });
    vi.spyOn(button, "matches").mockReturnValue(true);
    fireEvent.focus(button);
    act(() => vi.advanceTimersByTime(24000));
    expect(button.getAttribute("aria-pressed")).toBe("true");
    fireEvent.blur(button);
    act(() => vi.advanceTimersByTime(12000));
    expect(screen.getByRole("button", { name: "Comercio" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("reinicia el tiempo al elegir el modelo actual", () => {
    render(<HeroPreview />);
    act(() => vi.advanceTimersByTime(11000));
    fireEvent.click(screen.getByRole("button", { name: "Profesional" }));
    act(() => vi.advanceTimersByTime(11999));
    expect(screen.getByRole("button", { name: "Profesional" }).getAttribute("aria-pressed")).toBe("true");
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("button", { name: "Comercio" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("avanza si falla una captura y conserva la imagen anterior", () => {
    const { container } = render(<HeroPreview />);
    act(() => vi.advanceTimersByTime(12000));
    const image = Array.from(container.querySelectorAll("picture"))
      .find((picture) => picture.querySelector("source")?.getAttribute("srcset")?.includes("comercio"))!
      .querySelector("img")!;
    fireEvent.error(image);
    expect(screen.getByText("estudiorivas.com")).toBeDefined();
    act(() => vi.advanceTimersByTime(12000));
    expect(screen.getByRole("button", { name: /Gastronom/ }).getAttribute("aria-pressed")).toBe("true");
  });

  it("reconoce las capturas iniciales cargadas antes de hidratar", () => {
    const complete = vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(true);
    const currentSrc = vi.spyOn(HTMLImageElement.prototype, "currentSrc", "get").mockReturnValue("http://localhost/cached.webp");
    const naturalWidth = vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(100);
    render(<HeroPreview />);
    for (let index = 0; index < 4; index++) act(() => vi.advanceTimersByTime(12000));
    expect(screen.getByRole("button", { name: "Profesional" }).getAttribute("aria-pressed")).toBe("true");
    act(() => vi.advanceTimersByTime(12000));
    expect(screen.getByRole("button", { name: "Comercio" }).getAttribute("aria-pressed")).toBe("true");
    complete.mockRestore(); currentSrc.mockRestore(); naturalWidth.mockRestore();
  });

  it("muestra la dirección correspondiente a cada negocio", () => {
    const { container } = render(<HeroPreview />);
    for (const [name, slug, address] of [
      ["Comercio", "comercio", "casabonita.com.ar"],
      ["Gastronomía", "gastronomia", "cantinasorrento.com.ar"],
      ["Bienestar", "bienestar", "nucleotraining.com.ar"],
      ["Profesional", "profesional", "estudiorivas.com"],
    ]) {
      fireEvent.click(screen.getByRole("button", { name }));
      const images = Array.from(container.querySelectorAll("picture"))
        .filter((picture) => picture.querySelector("source")?.getAttribute("srcset")?.includes(slug))
        .map((picture) => picture.querySelector("img")!);
      expect(images).toHaveLength(2);
      images.forEach((image) => fireEvent.load(image));
      expect(screen.getByText(address)).toBeDefined();
    }
  });

  it("no muestra una selección anterior si termina de cargar después de otra", () => {
    const { container } = render(<HeroPreview />);
    fireEvent.click(screen.getByRole("button", { name: "Comercio" }));
    fireEvent.click(screen.getByRole("button", { name: "Bienestar" }));
    const imagesFor = (slug: string) => Array.from(container.querySelectorAll("picture"))
      .filter((picture) => picture.querySelector("source")?.getAttribute("srcset")?.includes(slug))
      .map((picture) => picture.querySelector("img")!);

    const latest = imagesFor("bienestar");
    const previous = imagesFor("comercio");
    latest.forEach((image) => fireEvent.load(image));
    previous.forEach((image) => fireEvent.load(image));
    expect(latest.every((image) => image.className.includes("opacity-100"))).toBe(true);
    expect(previous.every((image) => image.className.includes("opacity-0"))).toBe(true);
  });

  it("respeta movimiento reducido y permite elegir manualmente", () => {
    mockMedia(true, true);
    render(<HeroPreview />);
    act(() => vi.advanceTimersByTime(24000));
    fireEvent.click(screen.getByRole("button", { name: "Gastronomía" }));
    act(() => vi.advanceTimersByTime(24000));
    expect(screen.getByRole("button", { name: "Gastronomía" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("incluye las fuentes iniciales en HTML y limita las capturas al ancho de escritorio", () => {
    mockMedia(false);
    const html = renderToStaticMarkup(<HeroPreview />);
    expect(html.match(/<source/g)).toHaveLength(2);
    expect(html).toContain('media="(min-width: 1024px)"');
    expect(html).toContain("profesional.webp");
    expect(html).not.toContain("comercio.webp");
  });
});
