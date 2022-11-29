import Dropdown from "@commons/Dropdown";
import React from "react";

import { Scontainer, Scontent } from "./styles";

export const ToggleDate = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <Scontainer>
      <Dropdown
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        label="Setembro de 2022"
        position="center"
        top="4rem"
      >
        <Scontent>
          <h1>teste</h1>
        </Scontent>
      </Dropdown>
    </Scontainer>
  );
};
