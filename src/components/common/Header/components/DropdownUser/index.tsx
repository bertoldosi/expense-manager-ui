import Dropdown from "@commons/Dropdown";
import { User } from "@icons/User";
import { googleLogout } from "@react-oauth/google";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import {
  UserAppContextData,
  UserAppContextDataType,
} from "src/context/userAppContextData";
import { useTheme } from "styled-components";
import Cookies from "universal-cookie";

import { Scontainer, ScontentFooter, Sitem } from "./styles";

function DropdownUser() {
  const theme = useTheme();
  const [isVisible, setIsVisible] = React.useState(false);
  const { user } = React.useContext(
    UserAppContextData
  ) as UserAppContextDataType;

  const cookies = new Cookies();

  const logOut = () => {
    googleLogout();

    cookies.remove("expense-manager");
    Router.push("/login");
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
        <ScontentFooter>{user?.name}</ScontentFooter>
      </Scontainer>
    </Dropdown>
  );
}

export default DropdownUser;
