import React from "react";

import HeaderLogo from "@containers/Layout/HeaderLogo";
import HeaderUser from "@containers/Layout/HeaderUser";

import { Scontainer, Scontent } from "./styles";

function Header() {
  return (
    <>
      <Scontainer>
        <Scontent>
          <HeaderLogo />
          <HeaderUser />
        </Scontent>
      </Scontainer>
    </>
  );
}

export default Header;
