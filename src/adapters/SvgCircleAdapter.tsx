import React from "react";
import { useTheme } from "../components/ui/ThemeProvider";

export interface SvgCircleAdapterProps extends React.SVGProps<SVGCircleElement> {
  fillColor?: string;
  onClick?: () => void;
  cursorPointer?: boolean;
}

/**
 * SvgCircleAdapter wraps the SVG <circle> element to provide consistent styling
 * and theme integration for circle elements in the app.
 */
export const SvgCircleAdapter: React.FC<SvgCircleAdapterProps> = ({
  fillColor,
  onClick,
  cursorPointer = true,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <circle
      style={{ cursor: cursorPointer ? "pointer" : "default", transition: "fill 0.2s" }}
      fill={fillColor ?? "lightgray"}
      onClick={onClick}
      {...rest}
    />
  );
};