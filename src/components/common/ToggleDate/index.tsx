import React from "react";

import Dropdown from "@commons/Dropdown";
import { Calendar } from "@commons/Calendar";

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
          <Calendar />
        </Scontent>
      </Dropdown>
    </Scontainer>
  );
};
