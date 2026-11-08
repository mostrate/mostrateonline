import { render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import BibliotecaTemplatesPage from "./page";

afterEach(() => vi.unstubAllGlobals());

it("presenta los modelos bajo el título y la bajada sin botón de regreso", () => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  render(<BibliotecaTemplatesPage />);
  expect(screen.queryByRole("link", { name: "Volver al inicio" })).toBeNull();
  const title = screen.getByRole("heading", { level: 1 });
  const subtitle = screen.getByText(/Cuatro diseños pensados para distintos rubros/);
  expect(title.compareDocumentPosition(subtitle) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
});
