import React from "react";

import { Scontainer, Scontent } from "./styles";
import { Logo } from "./components/Logo";
import { User } from "./components/User";

function Header() {
  return (
    <Scontainer>
      <Scontent>
        <Logo />
        <User />
      </Scontent>
    </Scontainer>
  );
}

export default Header;
