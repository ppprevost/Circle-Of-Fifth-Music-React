import { describe, it, expect } from "vitest";
import { NOTES_CHROMATIC, DEFAULT_OCTAVE } from "./notes";

describe("notes constants", () => {
  it("NOTES_CHROMATIC contains 12 notes", () => {
    expect(NOTES_CHROMATIC).toHaveLength(12);
    expect(NOTES_CHROMATIC).toContain("C#");
    expect(NOTES_CHROMATIC).toContain("F#");
    expect(NOTES_CHROMATIC).toContain("B");
  });

  it("DEFAULT_OCTAVE is 4", () => {
    expect(DEFAULT_OCTAVE).toBe(4);
  });
});