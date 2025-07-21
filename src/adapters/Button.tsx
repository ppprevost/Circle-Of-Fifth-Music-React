import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

export interface ButtonProps extends Omit<MuiButtonProps, "color"> {
  color?: "primary" | "secondary" | "inherit";
  children: React.ReactNode;
}

/**
 * Button wraps Material UI Button to provide a consistent interface
 * and theme integration for buttons across the app.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  variant = "contained",
  disabled = false,
  onClick,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <MuiButton
      color={color}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      {...rest}
      sx={{
        borderRadius: 16,
        fontWeight: 600,
        fontSize: 16,
        boxShadow: theme.shadows[2],
        textTransform: "none",
        ...rest.sx,
      }}
    >
      {children}
    </MuiButton>
  );
};