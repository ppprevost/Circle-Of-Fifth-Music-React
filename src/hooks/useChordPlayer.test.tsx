import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useChordPlayer, mapToChromatic } from "./useChordPlayer";
import { DEFAULT_OCTAVE } from "../constants/notes";

vi.mock("../adapters/tone", () => ({
  createPolySynth: () => ({
    triggerAttackRelease: vi.fn(),
    triggerRelease: vi.fn(),
  }),
  startAudioContext: vi.fn(),
  triggerAttackRelease: (synth: any, note: string, duration: string) => synth.triggerAttackRelease(note, duration),
}));

vi.mock("../adapters/tonal", () => ({
  getChordNotes: (chord: string) => {
    if (chord === "Cmaj7") return ["C", "E", "G", "B"];
    if (chord === "G7") return ["G", "B", "D", "F"];
    return [];
  },
  enharmonic: (note: string) => {
    if (note === "Eb") return "D#";
    return note;
  },
}));

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("useChordPlayer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should play a single note and update currentPlayingNote", async () => {
    const { result } = renderHook(() => useChordPlayer());
    await act(async () => {
      await result.current.playNote("C4");
      await wait(450); // wait for setTimeout in playNote
    });
    expect(result.current.currentPlayingNote).toBe(null);
  });

  it("should play a chord and update currentPlayingNote", async () => {
    const { result } = renderHook(() => useChordPlayer());
    await act(async () => {
      await result.current.playChord("Cmaj7", DEFAULT_OCTAVE);
    });
    expect(result.current.currentPlayingNote).toBe(null);
  });

  it("mapToChromatic returns correct value", () => {
    expect(mapToChromatic("Eb")).toBe("D#");
    expect(mapToChromatic("C")).toBe("C");
  });
});