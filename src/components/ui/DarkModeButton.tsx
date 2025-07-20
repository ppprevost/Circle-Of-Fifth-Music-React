import { React } from "../../adapters/react";
import { useTheme } from "./ThemeProvider";

export const DarkModeButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        padding: "8px 18px",
        borderRadius: 16,
        fontWeight: 600,
        fontSize: 16,
        background: theme === "dark" ? "#222" : "#fff",
        color: theme === "dark" ? "#fff" : "#222",
        border: "1px solid #888",
        boxShadow: "0 2px 8px #0001",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s"
      }}
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};