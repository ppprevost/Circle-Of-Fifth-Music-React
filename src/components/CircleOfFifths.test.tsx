import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { React } from "../adapters/react";
import { CircleOfFifths } from "./CircleOfFifths";
import "@testing-library/jest-dom";

describe("CircleOfFifths", () => {
  it("renders the root select and chord chips", () => {
    render(<CircleOfFifths />);
    // Check the select is present
    expect(screen.getByLabelText(/Note initiale/i)).toBeInTheDocument();
    // Check the select has the correct options
    const select = screen.getByLabelText(/Note initiale/i);
    expect(select).toBeInTheDocument();
    expect(screen.getAllByRole("option", { name: "C" })).toHaveLength(1);
    // Check the chord chips for root C
    expect(screen.getByRole("button", { name: "C" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cdim" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cmaj7" })).toBeInTheDocument();
  });

  it("changes root note and updates chips", () => {
    render(<CircleOfFifths />);
    fireEvent.change(screen.getByLabelText(/Note initiale/i), { target: { value: "D" } });
    expect(screen.getByRole("button", { name: "D" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ddim" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dmaj7" })).toBeInTheDocument();
  });
});