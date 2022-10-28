import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

type ThemeTypes = {
  children: ReactNode;
};

const common = {};

export const lightTheme = {
  ...common,
  backgroundBory: "",
  color: "",

  backgroundHeade: "#708090",
  backgroundHeadeEmphasis: "#b0c4de",
  backgroundHeadeLineFooterEmphasis: "#de4f15",

  backgroundHeadeTable: "#fff",

  backgroundNav: "",
  backgroundNavEmphasis: "",
  backgroundLineFooterEmphasis: "",

  backgroundCardPrimary: "",
  backgroundCardSecondary: "",

  backgroundButton: "",
};

export const darkTheme = {
  ...common,
  backgroundBory:
    "linear-gradient(180deg, #0E398B 0%, rgba(24, 114, 165, 0.672688) 99.53%, rgba(19, 103, 151, 0.855911) 103.83%, rgba(28, 121, 173, 0.572576) 103.84%, rgba(33, 131, 187, 0.401042) 103.85%, rgba(45, 156, 219, 0) 103.86%, rgba(43, 152, 214, 0.0605227) 103.86%) no-repeat;",
  color: "#333",

  backgroundHeade: "",
  backgroundHeadeEmphasis: "",
  backgroundHeadeLineFooterEmphasis: "",

  backgroundHeadeTable: "",

  backgroundNav: "",
  backgroundNavEmphasis: "",
  backgroundLineFooterEmphasis: "",

  backgroundCardPrimary: "",
  backgroundCardSecondary: "",

  backgroundButton: "",
};

const theme = lightTheme;

const Theme = ({ children }: ThemeTypes) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
