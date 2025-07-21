import { describe, it, expect, vi } from "vitest";
import { ChordChips } from "./ChordChips";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ChordChips", () => {
  it("renders all chord chips for root C", () => {
    render(<ChordChips root="C" onChipClick={() => {}} />);
    expect(screen.getByRole("button", { name: "C" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cdim" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cmaj7" })).toBeInTheDocument();
  });

  it("calls onChipClick with correct chord name", () => {
    const onChipClick = vi.fn();
    render(<ChordChips root="D" onChipClick={onChipClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Dmaj7" }));
    expect(onChipClick).toHaveBeenCalledWith("Dmaj7");
  });
});