import Dropdown from "@commons/Dropdown";
import { User } from "@icons/User";
import Link from "next/link";
import React from "react";
import { UserContext, UserContextType } from "src/context/userContext";
import { useTheme } from "styled-components";

import { Scontainer, ScontentFooter, Sitem } from "./styles";

function DropdownUser() {
  const theme = useTheme();
  const [isVisible, setIsVisible] = React.useState(false);
  const { user } = React.useContext(UserContext) as UserContextType;

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
          <Link href="/alterar-gasto">Alterar gasto</Link>
        </Sitem>
        <Sitem>
          <Link href="/gerenciar-gasto">Gerenciar gasto</Link>
        </Sitem>
        <ScontentFooter>{user?.name}</ScontentFooter>
      </Scontainer>
    </Dropdown>
  );
}

export default DropdownUser;
