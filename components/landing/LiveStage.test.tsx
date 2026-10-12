import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { demos, templates } from "@/lib/config";
import LiveStage from "./LiveStage";

describe("LiveStage", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect() {}
      }
    );
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("ofrece la demo activa y la biblioteca de templates", () => {
    render(<LiveStage />);

    const demoLink = screen.getByRole("link", {
      name: `${demos.openDemo} ${templates.items[0].name}`,
    });
    expect(demoLink.getAttribute("href")).toBe(`/templates/${templates.items[0].slug}`);

    const libraryLinks = screen.getAllByRole("link", { name: demos.library });
    expect(libraryLinks).toHaveLength(2);
    libraryLinks.forEach((link) => {
      expect(link.getAttribute("href")).toBe("/biblioteca-templates");
    });
  });
});
