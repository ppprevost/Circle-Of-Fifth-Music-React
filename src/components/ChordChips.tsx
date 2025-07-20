const CHORD_TYPES = [
  { label: "Maj", suffix: "" },
  { label: "min", suffix: "m" },
  { label: "dim", suffix: "dim" },
  { label: "Maj7", suffix: "maj7" },
];

export const ChordChips: React.FC<{
  root: string;
  onChipClick: (chordName: string) => void;
}> = ({ root, onChipClick }) => (
  <div style={{ display: "flex", gap: 12, justifyContent: "center", margin: "24px 0" }}>
    {CHORD_TYPES.map((type) => {
      const chord = `${root}${type.suffix}`;
      return (
        <button
          key={chord}
          style={{
            borderRadius: 16,
            border: "1px solid #888",
            background: "#fff",
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 2px 8px #0001",
            transition: "background 0.2s",
          }}
          onClick={() => onChipClick(chord)}
        >
          {chord}
        </button>
      );
    })}
  </div>
);