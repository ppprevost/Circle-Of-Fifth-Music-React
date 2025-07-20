import { useRef, useState } from "../adapters/react";
import { DEFAULT_OCTAVE, NoteName, NOTES_CHROMATIC } from "../constants/notes";
import { getChordNotes, enharmonic } from "../adapters/tonal";
import {
  createPolySynth,
  startAudioContext,
  triggerAttackRelease,
} from "../adapters/tone";

/**
 * Map a note (e.g., "Eb") to the spelling used in NOTES_CHROMATIC (e.g., "D#").
 */
export function mapToChromatic(note: string): NoteName | null {
  if (NOTES_CHROMATIC.includes(note as NoteName)) return note as NoteName;
  const enh = enharmonic(note);
  if (NOTES_CHROMATIC.includes(enh as NoteName)) return enh as NoteName;
  if (NOTES_CHROMATIC.includes(note.toUpperCase() as NoteName)) return note.toUpperCase() as NoteName;
  return null;
}

function getChromaticIndex(note: string): number {
  const mapped = mapToChromatic(note);
  return mapped ? NOTES_CHROMATIC.indexOf(mapped) : -1;
}

export function useChordPlayer() {
  const synthRef = useRef<ReturnType<typeof createPolySynth> | null>(null);
  const [currentPlayingNote, setCurrentPlayingNote] = useState<string | null>(null);

  const playChord = async (
    chordName: string,
    baseOctave: number = DEFAULT_OCTAVE
  ) => {
    if (!synthRef.current) {
      synthRef.current = createPolySynth();
      await startAudioContext();
    }
    const chordNotes = getChordNotes(chordName);
    if (!chordNotes || chordNotes.length === 0) return;

    let octave = baseOctave;
    let prevIndex = getChromaticIndex(chordNotes[0]);
    for (let i = 0; i < chordNotes.length; i++) {
      const mapped = mapToChromatic(chordNotes[i]);
      const idx = getChromaticIndex(chordNotes[i]);
      if (i > 0 && idx !== -1 && prevIndex !== -1 && idx <= prevIndex) {
        octave += 1;
      }
      const note = `${mapped ?? chordNotes[i]}${octave}`;
      setCurrentPlayingNote(note);
      triggerAttackRelease(synthRef.current, note, "0.4");
      prevIndex = idx;
      // Wait 0.5s before next note
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, 500));
    }
    setCurrentPlayingNote(null);
  };

  const playNote = async (note: string) => {
    if (!synthRef.current) {
      synthRef.current = createPolySynth();
      await startAudioContext();
    }
    setCurrentPlayingNote(note);
    triggerAttackRelease(synthRef.current, note, "0.4");
    setTimeout(() => setCurrentPlayingNote(null), 400);
  };

  return {
    playChord,
    playNote,
    currentPlayingNote,
    synthRef,
  };
}