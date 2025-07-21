import { React } from "../../adapters/react";
import { useTheme } from "./ThemeProvider";
import { Button } from "../../adapters/Button";

export const DarkModeButton: React.FC = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <Button
      onClick={toggleMode}
      aria-label="Toggle dark mode"
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        padding: "8px 18px",
        borderRadius: 16,
        fontWeight: 600,
        fontSize: 16,
        backgroundColor: mode === "dark" ? "#222" : "#fff",
        color: mode === "dark" ? "#fff" : "#222",
        border: "1px solid #888",
        boxShadow: "0 2px 8px #0001",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
        textTransform: "none",
      }}
    >
      {mode === "dark" ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
};