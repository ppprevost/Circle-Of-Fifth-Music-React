import { describe, it, expect } from "vitest";
import { formatNoteWithOctave, mapToChromatic, getCirclePositions, getCircleOfFifths } from "./noteUtils";
import { NOTES_CHROMATIC } from "../constants/notes";

describe("noteUtils", () => {
  it("formatNoteWithOctave returns correct string", () => {
    expect(formatNoteWithOctave("C", 4)).toBe("C4");
    expect(formatNoteWithOctave("G#", 5)).toBe("G#5");
  });

  it("mapToChromatic returns correct enharmonic", () => {
    expect(mapToChromatic("Eb")).toBe("D#");
    expect(mapToChromatic("C")).toBe("C");
    expect(mapToChromatic("F#")).toBe("F#");
    expect(mapToChromatic("Db")).toBe("C#");
  });

  it("getCirclePositions returns 12 positions", () => {
    const positions = getCirclePositions(NOTES_CHROMATIC);
    expect(positions).toHaveLength(12);
    expect(positions[0]).toHaveProperty("note", "C");
  });

  it("getCircleOfFifths returns correct order from C", () => {
    const circle = getCircleOfFifths("C");
    expect(circle[0]).toBe("C");
    expect(circle[1]).toBe("G");
    expect(circle[11]).toBe("F");
  });

  it("getCircleOfFifths returns correct order from G", () => {
    const circle = getCircleOfFifths("G");
    expect(circle[0]).toBe("G");
    expect(circle[1]).toBe("D");
    expect(circle[11]).toBe("C");
  });
});