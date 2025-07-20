/**
 * Tonal Adapter for Hexagonal Architecture.
 * Exposes only the required Tonal functions for the domain.
 */
import * as TonalChord from "@tonaljs/chord";
import { Note as TonalNote, transpose as tonalTranspose } from "@tonaljs/tonal";

export const getChordNotes = (chordName: string): string[] => TonalChord.get(chordName).notes;

export const detectChord = (notes: string[]): string[] => TonalChord.detect(notes);

export const enharmonic = (note: string): string => TonalNote.enharmonic(note);

export const transpose = (note: string, interval: string): string => tonalTranspose(note, interval);