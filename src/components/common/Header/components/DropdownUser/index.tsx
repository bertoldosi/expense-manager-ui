import Dropdown from "@commons/Dropdown";
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
        <Sitem>
          <a href="/alterar-gasto">Alterar gasto</a>
        </Sitem>
        <Sitem>
          <a href="/teste">Gerenciar gasto</a>
        </Sitem>
        <ScontentFooter>Matheus Bertoldo</ScontentFooter>
      </Scontainer>
    </Dropdown>
  );
};
