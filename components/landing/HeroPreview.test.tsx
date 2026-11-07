import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { templates } from "@/lib/config";
import HeroPreview from "./HeroPreview";

describe("HeroPreview", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("recorre los cuatro modelos y vuelve al primero", () => {
    render(<HeroPreview />);
    for (const item of templates.items) {
      expect(screen.getByRole("button", { name: item.name }).getAttribute("aria-pressed")).toBe("true");
      act(() => vi.advanceTimersByTime(6000));
    }
    expect(screen.getByRole("button", { name: templates.items[0].name }).getAttribute("aria-pressed")).toBe("true");
  });

  it("sincroniza ambas pantallas al elegir una pestaña y continúa la rotación", () => {
    const { container } = render(<HeroPreview />);
    fireEvent.click(screen.getByRole("button", { name: "Bienestar" }));
    expect(screen.getByRole("button", { name: "Bienestar" }).getAttribute("aria-pressed")).toBe("true");
    const visible = Array.from(container.querySelectorAll("img.opacity-100"));
    expect(visible).toHaveLength(2);
    expect(visible[0].getAttribute("src")).toContain("bienestar.webp");
    expect(visible[1].getAttribute("src")).toContain("bienestar-mobile.webp");
    act(() => vi.advanceTimersByTime(6000));
    expect(screen.getByRole("button", { name: "Profesional" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("ofrece sólo las cuatro pestañas y sigue avanzando con el cursor sobre el marco", () => {
    render(<HeroPreview />);
    expect(screen.getAllByRole("button")).toHaveLength(4);
    fireEvent.mouseEnter(screen.getByRole("complementary"));
    act(() => vi.advanceTimersByTime(6000));
    expect(screen.getByRole("button", { name: "Comercio" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("respeta movimiento reducido y mantiene disponible la selección manual", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
    render(<HeroPreview />);
    act(() => vi.advanceTimersByTime(24000));
    expect(screen.getByRole("button", { name: "Profesional" }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: "Gastronomía" }));
    expect(screen.getByRole("button", { name: "Gastronomía" }).getAttribute("aria-pressed")).toBe("true");
  });
});
