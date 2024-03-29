import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundBory: string;
    color: string;

    backgroundHeade: string;
    backgroundHeadeEmphasis: string;
    backgroundHeadeLineFooterEmphasis: string;

    backgroundTableHeade: string;
    backgroundTableNoResult: string;
    backgroundTableItemEmphasis: string;

    backgroundNav: string;
    backgroundNavEmphasis: string;
    backgroundLineFooterEmphasis: string;

    backgroundCard: string;
    backgroundCardPrimary: string;
    backgroundCardSecondary: string;
    backgroundCardTertiary: string;

    colorButton: string;
    backgroundButton: string;
  }
}
