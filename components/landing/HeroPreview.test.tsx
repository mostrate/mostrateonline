import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
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

  it("reinicia la espera al seleccionar un modelo, incluso el que ya estaba seleccionado", () => {
    const { container } = render(<HeroPreview />);
    act(() => vi.advanceTimersByTime(11000));
    fireEvent.click(screen.getByRole("button", { name: "Bienestar" }));
    act(() => vi.advanceTimersByTime(11000));
    fireEvent.click(screen.getByRole("button", { name: "Bienestar" }));
    act(() => vi.advanceTimersByTime(11999));
    expect(screen.getByRole("button", { name: "Bienestar" }).getAttribute("aria-pressed")).toBe("true");
    expect(container.querySelectorAll("img")).toHaveLength(2);
    expect(Array.from(container.querySelectorAll("img")).every((img) => img.src.includes("bienestar"))).toBe(true);
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("button", { name: "Profesional" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("pausa y reanuda el simulador", () => {
    render(<HeroPreview />);
    fireEvent.click(screen.getByRole("button", { name: "Pausar" }));
    act(() => vi.advanceTimersByTime(24000));
    expect(screen.getByRole("button", { name: "Profesional" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("complementary").className).toContain("hero-preview-paused");
    fireEvent.click(screen.getByRole("button", { name: "Reanudar" }));
    act(() => vi.advanceTimersByTime(12000));
    expect(screen.getByRole("button", { name: "Comercio" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("respeta movimiento reducido y permite elegir manualmente", () => {
    mockMedia(true, true);
    render(<HeroPreview />);
    act(() => vi.advanceTimersByTime(24000));
    fireEvent.click(screen.getByRole("button", { name: "Gastronomía" }));
    act(() => vi.advanceTimersByTime(24000));
    expect(screen.getByRole("button", { name: "Gastronomía" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("no carga capturas cuando el simulador está oculto en móvil", () => {
    mockMedia(false);
    const { container } = render(<HeroPreview />);
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });
});
