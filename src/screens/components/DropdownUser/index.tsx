import Link from "next/link";
import Cookies from "universal-cookie";
import { signOut } from "next-auth/react";
import React, { useContext, useState } from "react";

import { User } from "@components/User";
import Dropdown from "@components/Dropdown";
import { userContextData, userContextDataType } from "@context/userContextData";

import { Scontainer, ScontentFooter, Sitem } from "./styles";

function DropdownUser() {
  const cookies = new Cookies();

  const [isVisible, setIsVisible] = useState(false);
  const { user } = useContext(userContextData) as userContextDataType;

  const logOut = () => {
    signOut();
    cookies.remove("expense-manager");
  };

  return (
    <Dropdown
      position="left"
      hideChevronIcon
      icon={<User />}
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
        <ScontentFooter>{user?.name}</ScontentFooter>
      </Scontainer>
    </Dropdown>
  );
}

export default DropdownUser;
