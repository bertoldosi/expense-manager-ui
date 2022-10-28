import { MoonStars, SunDim } from "phosphor-react";
import React from "react";
import { UserContext, UserContextType } from "src/context/userContext";
import { ToggleThemeButton } from "../..";

import { Container } from "./styles";

type Props = {};

export const HeadeToggleTheme: React.FC = ({}: Props) => {
  return (
    <Container>
      <ToggleThemeButton />
    </Container>
  );
};
