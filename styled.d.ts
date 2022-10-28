import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundBory: string;
    color: string;

    backgroundHeade: string;
    backgroundHeadeEmphasis: string;
    backgroundHeadeLineFooterEmphasis: string;

    backgroundHeadeTable: string;

    backgroundNav: string;
    backgroundNavEmphasis: string;
    backgroundLineFooterEmphasis: string;

    backgroundCardPrimary: string;
    backgroundCardSecondary: string;

    backgroundButton: string;
  }
}
