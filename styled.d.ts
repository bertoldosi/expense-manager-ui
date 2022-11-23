import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundBory: string;
    backgroundPrimary: string;
    backgroundSecondary: string;

    color: string;
    colorSecondary: string;
  }
}
