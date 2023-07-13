import Link from "next/link";
import Cookies from "universal-cookie";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

import { User } from "@icons/User";
import Dropdown from "@commons/Dropdown";

import { Scontainer, ScontentFooter, Sitem } from "./styles";
import { useTheme } from "styled-components";

function LayoutHeaderUser() {
  const cookies = new Cookies();
  const theme = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();

  const logOut = () => {
    signOut();
    cookies.remove("expense-manager");
  };

  return (
    <Dropdown
      position="left"
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
        <Sitem>
          <span onClick={logOut}>Sair</span>
        </Sitem>
        <ScontentFooter>{session?.user?.name}</ScontentFooter>
      </Scontainer>
    </Dropdown>
  );
}

export default LayoutHeaderUser;
