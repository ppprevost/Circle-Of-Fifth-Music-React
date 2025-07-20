export const NOTES_CHROMATIC = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
] as const;

export type NoteName = typeof NOTES_CHROMATIC[number];

export const DEFAULT_OCTAVE = 4;