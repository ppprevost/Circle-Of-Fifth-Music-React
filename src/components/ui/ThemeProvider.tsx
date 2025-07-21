import { React } from "../../adapters/react";
import { MaterialUIThemeProvider, useMaterialUITheme } from "../../adapters/materialUITheme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MaterialUIThemeProvider>{children}</MaterialUIThemeProvider>;
};

export const useTheme = useMaterialUITheme;