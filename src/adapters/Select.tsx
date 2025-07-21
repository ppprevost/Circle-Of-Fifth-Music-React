import React from "react";
import { useTheme } from "../components/ui/ThemeProvider";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Select wraps the native <select> element to provide consistent styling
 * and theme integration for select dropdowns across the app.
 */
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        fontSize: 16,
        padding: "4px 12px",
        borderRadius: 8,
        border: `1px solid ${theme.mode === "dark" ? "#555" : "#ccc"}`,
        backgroundColor: theme.mode === "dark" ? "#222" : "#fff",
        color: theme.mode === "dark" ? "#eee" : "#000",
        outline: "none",
        cursor: "pointer",
      }}
      {...rest}
    >
      {options.map(({ value: optValue, label }) => (
        <option key={optValue} value={optValue}>
          {label}
        </option>
      ))}
    </select>
  );
};