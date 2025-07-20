interface ChordDisplayProps {
  chordName: string;
}

export const ChordDisplay: React.FC<ChordDisplayProps> = ({ chordName }) => (
  <foreignObject
    x={100}
    y={180}
    width={200}
    height={40}
    style={{
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        fontWeight: 700,
        color: "#222",
        background: "transparent",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      {chordName}
    </div>
  </foreignObject>
);