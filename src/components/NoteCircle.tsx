import { NoteName } from "../constants/notes";

interface NoteCircleProps {
  notes: readonly NoteName[];
  selectedNotes: string[];
  onNoteClick: (note: string) => void;
  positions: { note: NoteName; x: number; y: number }[];
  formatNoteWithOctave: (note: NoteName) => string;
  currentPlayingNote?: string | null;
}

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
          <circle
            style={{ cursor: "pointer", transition: "fill 0.2s" }}
            key={note}
            cx={x}
            cy={y}
            r={20}
            fill={fill}
            onClick={() => onNoteClick(noteId)}
          />
        );
      })}
      {positions.map(({ note, x, y }) => (
        <text
          key={note + "-label"}
          x={x}
          y={y + 5}
          textAnchor="middle"
          fontSize="12"
          fill="black"
        >
          {note}
        </text>
      ))}
    </>
  );
};