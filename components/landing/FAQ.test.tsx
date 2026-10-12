import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { faq } from "@/lib/config";
import FAQ from "./FAQ";

describe("FAQ", () => {
  it("muestra cada pregunta y respuesta en un control nativo", () => {
    render(<FAQ />);

    expect(screen.getAllByRole("group")).toHaveLength(faq.items.length);
    expect(screen.getByText(faq.items[0].question)).toBeDefined();
    expect(screen.getByText(faq.items[0].answer)).toBeDefined();
  });
});
