import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme, PaletteMode } from "@mui/material/styles";

interface ThemeContextProps {
  mode: PaletteMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: "light",
  toggleMode: () => {},
});

export const THEME_MODES: Record<string, PaletteMode> = {
  LIGHT: "light",
  DARK: "dark",
};

const lightTheme = createTheme({
  palette: {
    mode: THEME_MODES.LIGHT,
  },
  typography: {
    fontFamily: "'Romanesco', cursive",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: THEME_MODES.DARK,
  },
  typography: {
    fontFamily: "'Romanesco', cursive",
  },
});

export const MaterialUIThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useMaterialUITheme = () => useContext(ThemeContext);