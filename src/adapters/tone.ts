/**
 * Tone.js Adapter for Hexagonal Architecture.
 * Exposes only the required Tone.js synth logic for the domain.
 */
import * as Tone from "tone";

export type PolySynthType = Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>;

export const createPolySynth = (): PolySynthType =>
  new Tone.PolySynth(Tone.Synth).toDestination();

export const startAudioContext = async () => {
  await Tone.start();
};

export const triggerAttackRelease = (
  synth: PolySynthType,
  note: string,
  duration: string | number
) => {
  synth.triggerAttackRelease(note, duration);
};

export const triggerRelease = (
  synth: PolySynthType,
  note: string
) => {
  synth.triggerRelease(note);
};