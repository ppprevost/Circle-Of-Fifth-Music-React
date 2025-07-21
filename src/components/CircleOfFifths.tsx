import {
  useState,
  useEffect,
  useRef,
} from "../adapters/react";
import { NOTES_CHROMATIC, NoteName, DEFAULT_OCTAVE } from "../constants/notes";
import { formatNoteWithOctave, getCirclePositions, mapToChromatic } from "../utils/noteUtils";
import { NoteCircle } from "./NoteCircle";
import { ChordDisplay } from "./ChordDisplay";
import { ChordChips } from "./ChordChips";
import { getChordNotes, detectChord, transpose, enharmonic } from "../adapters/tonal";
import { useChordPlayer } from "../hooks/useChordPlayer";
import { Button } from "../adapters/Button";
import { Select } from "../adapters/Select";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

/**
 * Get the pitch class (note name without octave) from a note string.
 */
const getPitchClass = (note: string) => note.replace(/[0-9]/g, "");

/**
 * The canonical circle of fifths order.
 */
/**
 * Generate the circle of fifths order mathematically from the chromatic scale.
 */
function generateCircleOfFifths(chromatic: NoteName[], root: NoteName = "C"): NoteName[] {
  const result: NoteName[] = [];
  let idx = chromatic.indexOf(root);
  for (let i = 0; i < 12; i++) {
    result.push(chromatic[idx]);
    idx = (idx + 7) % 12; // move up a perfect fifth (7 semitones)
  }
  return result;
}

/**
 * Generate the circle of fifths starting from a given root.
 */
function getCircleOfFifths(root: string): NoteName[] {
  return generateCircleOfFifths([...NOTES_CHROMATIC], root as NoteName);
}

/**
 * Transpose a chord name from a base root to a new root.
 * Only works for simple chord names (e.g., G, Gm, Gdim, Gmaj7, etc.)
 */
function transposeChord(chord: string, from: string, to: string): string {
  // Extract root and suffix
  const match = chord.match(/^([A-G][b#]?)(.*)$/);
  if (!match) return chord;
  const [, chordRoot, suffix] = match;
  const interval = transpose(from, to);
  const newRoot = transpose(chordRoot, interval);
  return `${newRoot}${suffix}`;
}

/**
 * Generate the mirror code sequence for a given root.
 */
function getMirrorCodeSequence(root: string): { chords: string[] }[] {
  // The base sequence is for G as root
  const base = [
    { chords: ["G", "Cm"] },
    { chords: ["Gdim"] },
    { chords: ["Dm7", "A6"] },
    { chords: ["Bbsus2", "Bb7sus4"] },
    { chords: ["Bsus4"] },
    { chords: ["Cmaj7b5", "G#7"] },
    { chords: ["Dbaug"] },
  ];
  if (root === "G") return base;
  // Transpose all chords from G to root
  return base.map(step => ({
    chords: step.chords.map(chord => transposeChord(chord, "G", root))
  }));
}

export const CircleOfFifths: React.FC = () => {
  const {
    playChord,
    playNote,
    currentPlayingNote,
    synthRef,
  } = useChordPlayer();

  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [chordName, setChordName] = useState("");
  const [root, setRoot] = useState<NoteName>("C");
  const [isPlayingMirror, setIsPlayingMirror] = useState(false);
  const mirrorStopRequestedRef = useRef(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const circleNotes = getCircleOfFifths(root);
  const positions = getCirclePositions(circleNotes);

  useEffect(() => {
    if (selectedNotes.length < 3) {
      setChordName("");
      return;
    }
    const pitchClasses = selectedNotes.map(getPitchClass);
    const detected = detectChord(pitchClasses);
    setChordName(detected.length > 0 ? detected[0] : "Accord inconnu");
  }, [selectedNotes]);

  const handleNoteClick = async (note: string) => {
    if (selectedNotes.includes(note)) {
      const newNotes = selectedNotes.filter((sel) => sel !== note);
      synthRef.current?.triggerRelease(note);
      setSelectedNotes(newNotes);
      return;
    }
    const newSelected = [...selectedNotes, note];
    setSelectedNotes(newSelected);
    await playNote(note);
  };

  const handleChipClick = async (chipChordName: string) => {
    const chordNotes = getChordNotes(chipChordName);
    const chromaticNotes = chordNotes
      .map((n) => mapToChromatic(n))
      .filter((n): n is NoteName => !!n)
      .map((n) => `${n}${DEFAULT_OCTAVE}`);
    setSelectedNotes(chromaticNotes);
    playChord(chipChordName, DEFAULT_OCTAVE);
  };

  const playMirrorCode = async (forceRoot?: NoteName) => {
    try {
      setIsPlayingMirror(true);
      mirrorStopRequestedRef.current = false;
      const sequence = getMirrorCodeSequence(forceRoot ?? root);
      console.log("Mirror code sequence:", sequence);
      for (const step of sequence) {
        for (const chord of step.chords) {
          const chordNotes = getChordNotes(chord);
          const mappedNotes = chordNotes.map((n) => mapToChromatic(n));
          const chromaticNotes = mappedNotes
            .filter((n): n is NoteName => !!n)
            .map((n) => `${n}${DEFAULT_OCTAVE}`);
          setSelectedNotes(chromaticNotes);
          await playChord(chord, DEFAULT_OCTAVE);
          // Wait a bit between chords
          await new Promise((res) => setTimeout(res, 400));
          if (mirrorStopRequestedRef.current) {
            return;
          }
        }
      }
    } catch (error) {
      console.error("Error playing mirror code:", error);
    } finally {
      setIsPlayingMirror(false);
      setSelectedNotes([]);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        }}
      >
        <div style={{ margin: "16px 0" }}>
          <label htmlFor="root-select" style={{ fontWeight: 600, marginRight: 8 }}>
            Note initiale :
          </label>
          <Select
            value={root}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRoot(e.target.value as NoteName)}
            options={NOTES_CHROMATIC.map(note => ({ value: note, label: note }))}
          />
        </div>
        <ChordChips root={root} onChipClick={handleChipClick} />

        <Button
          style={{
            margin: "12px 0 24px 0",
            padding: "10px 24px",
            borderRadius: 16,
            fontWeight: 700,
            fontSize: 18,
            background: isPlayingMirror ? "#aaa" : "#00e0ff",
            color: "#222",
            border: "none",
            cursor: isPlayingMirror ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px #0001",
            transition: "background 0.2s",
          }}
          disabled={isPlayingMirror}
          onClick={() => {
            setRoot("G");
            setTimeout(() => playMirrorCode("G"), 0);
          }}
        >
          Mirror Code
        </Button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          minHeight: 400,
          position: "relative",
        }}
      >
        <svg width={400} height={400} style={{ display: "block", margin: "auto" }}>
          <NoteCircle
            notes={circleNotes}
            selectedNotes={selectedNotes}
            onNoteClick={handleNoteClick}
            positions={positions}
            formatNoteWithOctave={(note: NoteName) => formatNoteWithOctave(note, DEFAULT_OCTAVE)}
            currentPlayingNote={currentPlayingNote}
          />
          <ChordDisplay chordName={chordName} />
        </svg>
      </div>
      <div style={{ position: "fixed", bottom: 10, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8, zIndex: 1300 }}>
        <Button
          onClick={() => setSelectedNotes([])}
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            mirrorStopRequestedRef.current = true;
            if (synthRef.current && typeof synthRef.current.releaseAll === "function") {
              synthRef.current.releaseAll();
            }
          }}
        >
          Stop
        </Button>
      </div>
      
      {/* Drawer toggle button */}
      <Button
        aria-label="Open menu"
        onClick={() => setDrawerOpen(true)}
        style={{ position: "fixed", top: 10, left: 10, zIndex: 1400 }}
      >
        Menu
      </Button>

      {/* Drawer component */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <List sx={{ width: 250 }}>
          {["What is Circle of Fifth", "Second Demo", "About"].map((text) => (
            <ListItem key={text} onClick={() => setDrawerOpen(false)} role="button" tabIndex={0}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};
  