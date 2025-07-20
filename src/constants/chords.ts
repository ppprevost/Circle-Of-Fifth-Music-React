export interface ChordDefinition {
  name: string;
  intervals: number[];
}

export const CHORD_DEFINITIONS: ChordDefinition[] = [
  { name: "Maj", intervals: [0, 4, 7] },
  { name: "min", intervals: [0, 3, 7] },
  { name: "dim", intervals: [0, 3, 6] },
  { name: "aug", intervals: [0, 4, 8] },
  { name: "sus2", intervals: [0, 2, 7] },
  { name: "sus4", intervals: [0, 5, 7] },
  { name: "Maj7", intervals: [0, 4, 7, 11] },
  { name: "7", intervals: [0, 4, 7, 10] },
  { name: "min7", intervals: [0, 3, 7, 10] },
  { name: "6", intervals: [0, 4, 7, 9] },
  { name: "min6", intervals: [0, 3, 7, 9] },
  { name: "9", intervals: [0, 4, 7, 10, 14] },
];