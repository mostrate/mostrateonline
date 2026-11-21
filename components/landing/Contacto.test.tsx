import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Contacto from "./Contacto";

it("muestra el nuevo correo y los campos solicitados sin rubro ni ubicación", () => {
  render(<Contacto />);
  expect(screen.getByRole("link", { name: "info@mostrate.com.ar" }).getAttribute("href")).toBe("mailto:info@mostrate.com.ar");
  expect(screen.getByLabelText("Nombre")).toBeDefined();
  expect(screen.getByLabelText("Email")).toBeDefined();
  expect(screen.getByLabelText("Mensaje").hasAttribute("required")).toBe(false);
  expect(screen.queryByLabelText("Rubro")).toBeNull();
  expect(screen.queryByText("Ubicación")).toBeNull();
});
