import React, { ReactNode } from "react";
import {
  UserContextConfig,
  UserContextConfigType,
} from "src/context/userContextConfig";
import { ThemeProvider } from "styled-components";

type ThemeTypes = {
  children: ReactNode;
};

export const lightTheme = {
  backgroundBory: "#f0f8ff",
  color: "#333",

  backgroundHeade: "#708090",
  backgroundHeadeEmphasis: "#b0c4de",
  backgroundHeadeLineFooterEmphasis: "#de4f15",

  backgroundTableHeade: "#fff",
  backgroundTableNoResult: "#fff",
  backgroundTableItemEmphasis: "#3333",

  backgroundNav: " #b0c4de",
  backgroundNavEmphasis: "#f8f8ff",
  backgroundLineFooterEmphasis: "#029b99",

  backgroundCard: "#fff",

  colorButton: "#333",
  backgroundButton: "#B0C4DE",
};

export const darkTheme = {
  backgroundBory: "#1B1B1D",
  backgroundPrimary: "#333",
  backgroundSecondary: "#fff",

  color: "#fff",
  colorSecondary: "#333",
};

const Theme = ({ children }: ThemeTypes) => {
  const { theme } = React.useContext(
    UserContextConfig
  ) as UserContextConfigType;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
