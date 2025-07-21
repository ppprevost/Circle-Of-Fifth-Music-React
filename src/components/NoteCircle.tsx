import { NoteName } from "../constants/notes";

interface NoteCircleProps {
  notes: readonly NoteName[];
  selectedNotes: string[];
  onNoteClick: (note: string) => void;
  positions: { note: NoteName; x: number; y: number }[];
  formatNoteWithOctave: (note: NoteName) => string;
  currentPlayingNote?: string | null;
}

import { SvgCircleAdapter } from "../adapters/SvgCircleAdapter";
import { SvgTextAdapter } from "../adapters/SvgTextAdapter";

export const NoteCircle: React.FC<NoteCircleProps> = ({
  notes,
  selectedNotes,
  onNoteClick,
  positions,
  formatNoteWithOctave,
  currentPlayingNote,
}) => {
  return (
    <>
      {positions.map(({ note, x, y }) => {
        const noteId = formatNoteWithOctave(note);
        let fill = "lightgray";
        if (selectedNotes.includes(noteId)) fill = "orange";
        if (currentPlayingNote && noteId === currentPlayingNote) fill = "#00e0ff";
        return (
          <SvgCircleAdapter
            key={note}
            cx={x}
            cy={y}
            r={20}
            fillColor={fill}
            onClick={() => onNoteClick(noteId)}
            cursorPointer={true}
          />
        );
      })}
      {positions.map(({ note, x, y }) => (
        <SvgTextAdapter key={note + "-label"} x={x} y={y + 5}>
          {note}
        </SvgTextAdapter>
      ))}
    </>
  );
};