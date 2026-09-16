import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "./page";

describe("Home page", () => {
  it("introduces the Happy Kids value proposition with a single page heading", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /crescer feliz começa com cuidado/i,
      }),
    ).toBeInTheDocument();
  });

  it("exposes the primary navigation with an accessible name", () => {
    render(<Page />);

    expect(
      screen.getByRole("navigation", { name: /principal/i }),
    ).toBeInTheDocument();
  });

  it("offers the primary appointment call to action", () => {
    render(<Page />);

    expect(
      screen.getByRole("link", { name: /agendar atendimento/i }),
    ).toHaveAttribute("href", "#agendar");
  });

  it("includes the clinic navigation and educational content", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { name: /informação também cuida/i }),
    ).toBeInTheDocument();
  });

  it("includes the illustrated scroll journey", () => {
    render(<Page />);

    expect(screen.getByRole("heading", { name: /cada descoberta merece apoio/i })).toBeInTheDocument();
    expect(screen.getByAltText(/criança escovando os dentes/i)).toHaveAttribute(
      "src",
      "/illustrations/happy-kids-learning.png",
    );
  });

  it("includes the safe space illustration", () => {
    render(<Page />);

    expect(
      screen.getByAltText(/criança acolhida por uma cuidadora/i),
    ).toHaveAttribute("src", "/illustrations/happy-kids-safe-space.png");
  });
});
