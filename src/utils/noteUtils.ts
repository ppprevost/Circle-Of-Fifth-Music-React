import { NoteName, NOTES_CHROMATIC } from "../constants/notes";
import { Note as TonalNote } from "@tonaljs/tonal";

/**
 * Formats a note with its octave.
 * @param note - The note name (e.g., "C", "D#").
 * @param octave - The octave number (default: 4).
 * @returns The note string with octave (e.g., "C4").
 */
export const formatNoteWithOctave = (note: NoteName, octave: number = 4): string =>
  `${note}${octave}`;

/**
 * Calculates the positions of notes in a circle (for the circle of fifths).
 * @param notes - Array of note names.
 * @param radius - The radius of the circle.
 * @param centerX - X coordinate of the center.
 * @param centerY - Y coordinate of the center.
 * @returns Array of objects with note and (x, y) positions.
 */
export const getCirclePositions = (
  notes: readonly NoteName[],
  radius: number = 150,
  centerX: number = 200,
  centerY: number = 200
) =>
  notes.map((note, i) => {
    const angle = (i / notes.length) * 2 * Math.PI - Math.PI / 2;
    return {
      note,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

/**
 * Map a note (e.g., "Eb") to the spelling used in NOTES_CHROMATIC (e.g., "D#").
 */
function arrayIncludes<T>(arr: readonly T[], value: T): boolean {
  return (arr as T[]).includes(value);
}

export function mapToChromatic(note: string): NoteName | null {
  if (arrayIncludes(NOTES_CHROMATIC, note as NoteName)) return note as NoteName;
  const enharmonic = TonalNote.enharmonic(note);
  if (arrayIncludes(NOTES_CHROMATIC, enharmonic as NoteName)) return enharmonic as NoteName;
  if (arrayIncludes(NOTES_CHROMATIC, note.toUpperCase() as NoteName)) return note.toUpperCase() as NoteName;
  return null;
}

/**
 * Canonical circle of fifths order.
 */
const FIFTHS: NoteName[] = [
  "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#", "F"
];

/**
 * Generate the circle of fifths starting from a given root.
 */
export function getCircleOfFifths(root: string): NoteName[] {
  const idx = FIFTHS.indexOf(root as NoteName);
  if (idx === -1) return FIFTHS;
  return [...FIFTHS.slice(idx), ...FIFTHS.slice(0, idx)];
}