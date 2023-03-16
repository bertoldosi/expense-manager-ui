import React from "react";

import { Scontainer, Scontent } from "./styles";
import { Logo } from "./components/Logo";
import { User } from "./components/User";
import { ToggleDate } from "./components/ToggleDate";

function Header() {
  return (
    <>
      <Scontainer>
        <Scontent>
          <Logo />
          <User />
        </Scontent>
      </Scontainer>
      {/* <ToggleDate /> */}
    </>
  );
}

export default Header;
