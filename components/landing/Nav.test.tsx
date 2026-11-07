import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Nav from "./Nav";

it("mantiene el menú móvil fuera del foco cuando está cerrado", () => {
  const { container } = render(<Nav />);
  const menu = container.querySelector('[aria-hidden="true"][inert]');
  expect(menu).not.toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Abrir menú" }));
  expect(menu?.hasAttribute("inert")).toBe(false);
  expect(menu?.getAttribute("aria-hidden")).toBe("false");
  fireEvent.click(screen.getByRole("button", { name: "Cerrar menú" }));
  expect(menu?.hasAttribute("inert")).toBe(true);
});
