import { NoteName, NOTES_CHROMATIC } from "../constants/notes";
import { Note as TonalNote, distance as tonalDistance } from "@tonaljs/tonal";

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
export function mapToChromatic(note: string): NoteName | null {
  if (NOTES_CHROMATIC.includes(note as NoteName)) return note as NoteName;
  const enharmonic = TonalNote.enharmonic(note);
  if (NOTES_CHROMATIC.includes(enharmonic as NoteName)) return enharmonic as NoteName;
  if (NOTES_CHROMATIC.includes(note.toUpperCase() as NoteName)) return note.toUpperCase() as NoteName;
  return null;
}

/**
 * Generate the circle of fifths using Tonal, starting from a given root.
 */
export function getCircleOfFifths(root: string): NoteName[] {
  // Start from root, then add successive perfect fifths
  const notes: NoteName[] = [];
  let current = root;
  for (let i = 0; i < 12; i++) {
    const mapped = mapToChromatic(current);
    notes.push(mapped ?? (current as NoteName));
    current = tonalDistance(current, "5P");
  }
  return notes;
}