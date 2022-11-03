import Dropdown from "@commons/Dropdown";
import { ToggleButtonTheme } from "@commons/ToggleButtonTheme";
import { User } from "@icons/User";
import React from "react";

import { Scontainer, ScontentFooter, Sitem } from "./styles";

export const DropdownUser = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <Dropdown
      position="right"
      hideChevronIcon
      icon={<User color="#fff" width={25} height={25} />}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <Scontainer>
        <Sitem className="no-emphasis">
          <h2>Matheus Bertoldo</h2>
        </Sitem>

        <Sitem>
          <h2>Sair</h2>
        </Sitem>

        <ScontentFooter>
          <ToggleButtonTheme />
        </ScontentFooter>
      </Scontainer>
    </Dropdown>
  );
};
