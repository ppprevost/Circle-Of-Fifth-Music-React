import { React, useState, useContext, createContext } from "../../adapters/react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const background = theme === "dark" ? "#111" : "#f8fafc";
  const color = theme === "dark" ? "#fff" : "#181c24";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme} style={{
        background,
        color,
        minHeight: "100vh",
        minWidth: "100vw",
        transition: "background 0.3s, color 0.3s"
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);