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
        <ScontentFooter>
          <ToggleButtonTheme />
        </ScontentFooter>
      </Scontainer>
    </Dropdown>
  );
};
