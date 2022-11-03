import { MoonStars, SunDim } from "phosphor-react";
import React from "react";
import { UserContext, UserContextType } from "src/context/userContext";

import { Container } from "./styles";

type Props = {};

export const ToggleButtonTheme: React.FC = ({}: Props) => {
  const { toggleTheme, isThemeDark } = React.useContext(
    UserContext
  ) as UserContextType;

  return (
    <Container>
      <input
        type="checkbox"
        id="checkbox"
        checked={isThemeDark}
        onChange={() => {
          toggleTheme();
        }}
      />
      <label htmlFor="checkbox">
        <MoonStars size={12} color="#a1cae1" />
        <SunDim size={12} color="#f49e12" />
        <div />
      </label>
    </Container>
  );
};
