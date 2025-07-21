import React from "react";
import { useTheme } from "../components/ui/ThemeProvider";

export interface SvgTextAdapterProps extends React.SVGProps<SVGTextElement> {
  children: React.ReactNode;
}

/**
 * SvgTextAdapter wraps the SVG <text> element to provide consistent styling
 * and abstraction for text elements in SVG.
 */
export const SvgTextAdapter: React.FC<SvgTextAdapterProps> = ({
  children,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <text
      textAnchor="middle"
      fontSize={12}
      fill={theme.mode === "dark" ? "#eee" : "black"}
      style={{ pointerEvents: "none", transition: "fill 0.2s" }}
      {...rest}
    >
      {children}
    </text>
  );
};