import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DemoToolbar from "./DemoToolbar";

const replace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  usePathname: () => "/templates/profesional",
}));

const props = {
  primaries: [
    { id: "blanco", name: "Blanco", color: "#FFFFFF", ink: "#16182B" },
    { id: "pizarra", name: "Pizarra", color: "#B8C4C8", ink: "#0F2A33" },
  ],
  themes: [
    { id: "azul", name: "Azul", accent: "#2F5FE0", accentStrong: "#2149B8", accentSoft: "rgba(0,0,0,0.1)", accentContrast: "#FFF" },
    { id: "bordo", name: "Bordó", accent: "#B23A54", accentStrong: "#8F2C43", accentSoft: "rgba(0,0,0,0.1)", accentContrast: "#FFF" },
  ],
  fonts: [
    { id: "newsreader", name: "Newsreader", heading: "var(--font-newsreader)" },
    { id: "jakarta", name: "Jakarta", heading: "var(--font-jakarta)" },
  ],
  designs: [
    { id: "1", name: "Clásico" },
    { id: "2", name: "Técnico" },
  ],
  activePrimaryId: "blanco",
  activeThemeId: "azul",
  activeFontId: "newsreader",
  activeDesignId: "1",
};

// La barra renderiza la versión desktop y la mobile (oculta por CSS); en
// jsdom ambas existen, así que se consulta dentro del bloque desktop.
function desktop() {
  return within(screen.getByRole("button", { name: /minimizar barra de demo/i }).parentElement!);
}

describe("DemoToolbar", () => {
  beforeEach(() => replace.mockClear());

  it("vuelve a la biblioteca desde la barra de la demo", () => {
    render(<DemoToolbar {...props} onPrimary={vi.fn()} onTheme={vi.fn()} onFont={vi.fn()} />);
    expect(desktop().getByRole("link", { name: "Volver a la biblioteca de diseños" }).getAttribute("href")).toBe("/biblioteca-templates");
  });

  it("cambia de diseño actualizando ?diseno= en la URL", async () => {
    const user = userEvent.setup();
    render(<DemoToolbar {...props} onPrimary={vi.fn()} onTheme={vi.fn()} onFont={vi.fn()} />);

    await user.click(desktop().getByRole("button", { name: /técnico/i }));
    expect(replace).toHaveBeenCalledWith("/templates/profesional?diseno=2", { scroll: false });
  });

  it("avisa el color primario, el secundario y la tipografía elegidos", async () => {
    const user = userEvent.setup();
    const onPrimary = vi.fn();
    const onTheme = vi.fn();
    const onFont = vi.fn();
    render(<DemoToolbar {...props} onPrimary={onPrimary} onTheme={onTheme} onFont={onFont} />);

    await user.click(desktop().getByRole("button", { name: "Color primario Pizarra" }));
    await user.click(desktop().getByRole("button", { name: "Color secundario Bordó" }));
    await user.click(desktop().getByRole("button", { name: "Tipografía Jakarta" }));

    expect(onPrimary).toHaveBeenCalledWith(props.primaries[1]);
    expect(onTheme).toHaveBeenCalledWith(props.themes[1]);
    expect(onFont).toHaveBeenCalledWith(props.fonts[1]);
  });

  it("se minimiza a una píldora y se vuelve a abrir", async () => {
    const user = userEvent.setup();
    render(<DemoToolbar {...props} onPrimary={vi.fn()} onTheme={vi.fn()} onFont={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /minimizar barra de demo/i }));
    expect(screen.queryByRole("button", { name: /minimizar barra de demo/i })).toBeNull();

    await user.click(screen.getAllByRole("button", { name: /personalizar demo/i })[0]);
    expect(screen.getByRole("button", { name: /minimizar barra de demo/i })).toBeDefined();
  });
});
