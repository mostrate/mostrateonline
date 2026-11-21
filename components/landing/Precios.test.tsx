import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import Precios from "./Precios";

it("presenta los cuatro planes y sus precios sin botones", () => {
  render(<Precios />);
  const planes = [
    ["Landing", "$ 250.000"],
    ["Landing Pro", "$ 400.000"],
    ["Sistema base", "$ 600.000 a $ 1.000.000"],
    ["Sistema personalizado", "Valor a convenir"],
  ];

  for (const [nombre, precio] of planes) {
    const tarjeta = screen.getByRole("heading", { name: nombre }).closest("article");
    expect(tarjeta).not.toBeNull();
    expect(within(tarjeta!).getByText(precio)).toBeDefined();
    expect(within(tarjeta!).queryByRole("link")).toBeNull();
    expect(within(tarjeta!).queryByRole("button")).toBeNull();
  }
});
