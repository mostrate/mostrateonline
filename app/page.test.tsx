import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

describe("accesos a la biblioteca desde la landing", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("abre la biblioteca en otra pestaña desde el hero y la navegación, sin mostrar la sección de demos", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
    const { container } = render(<Home />);
    const links = container.querySelectorAll('a[href="/biblioteca-templates"]');

    expect(links).toHaveLength(3); // Navegación de escritorio y móvil, más el hero.
    for (const link of links) {
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toContain("noopener");
    }
    expect(screen.getByRole("link", { name: "Explorar diseños" }).getAttribute("href")).toBe("/biblioteca-templates");
    expect(container.querySelector("#templates")).toBeNull();
  });
});
