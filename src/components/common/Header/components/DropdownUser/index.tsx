import Dropdown from "@commons/Dropdown";
import { ToggleButtonTheme } from "@commons/ToggleButtonTheme";
import { User } from "@icons/User";
import React from "react";
import { useTheme } from "styled-components";

import { Scontainer, ScontentFooter, Sitem } from "./styles";

export const DropdownUser = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <Dropdown
      position="right"
      hideChevronIcon
      icon={<User color={theme.color} width={25} height={25} />}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <Scontainer>
        <ScontentFooter>
          <ToggleButtonTheme setIsVisible={setIsVisible} />
        </ScontentFooter>
      </Scontainer>
    </Dropdown>
  );
};
