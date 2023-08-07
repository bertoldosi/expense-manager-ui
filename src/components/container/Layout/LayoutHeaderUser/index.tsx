import Link from "next/link";
import Cookies from "universal-cookie";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

import { User } from "@icons/User";
import Dropdown from "@commons/Dropdown";

import { Scontainer, ScontentFooter, Sitem } from "./styles";
import { useTheme } from "styled-components";
import { useRouter } from "next/router";
import { userContextData, userContextDataType } from "@context/userContextData";
import { ToggleButtonTheme } from "@commons/ToggleButtonTheme";

function LayoutHeaderUser() {
  const router = useRouter();
  const cookies = new Cookies();
  const theme = useTheme();

  const { setInstitution, setExpense, setSelectedInstitution } =
    React.useContext(userContextData) as userContextDataType;

  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();

  const logOut = () => {
    signOut();
    cookies.remove("expense-manager");
  };

  async function redirectChangeExpense() {
    cookies.remove("expense-manager");
    await router.push("/alterar-gasto");

    setInstitution(null);
    setExpense(null);
    setSelectedInstitution(null);
  }

  function redirectManagerExpense() {
    router.push("/gerenciar-gasto");
  }

  return (
    <Dropdown
      position="left"
      hideChevronIcon
      icon={<User color={theme.textSecondary} width={25} height={25} />}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <Scontainer>
        <Sitem onClick={redirectChangeExpense}>
          <Link href="#">Alterar gasto</Link>
        </Sitem>
        <Sitem onClick={redirectManagerExpense}>
          <Link href="#">Gerenciar gasto</Link>
        </Sitem>
        <Sitem>
          <span onClick={logOut}>Sair</span>
        </Sitem>
        <ScontentFooter>
          <ToggleButtonTheme />
          <span>{session?.user?.name}</span>
        </ScontentFooter>
      </Scontainer>
    </Dropdown>
  );
}

export default LayoutHeaderUser;
