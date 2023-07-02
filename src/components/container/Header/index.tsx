import React from "react";

// import { ToggleDate } from "@containers/ToggleDate";
import { Logo } from "@containers/Header/Logo";
import { User } from "@containers/User";

import { Scontainer, Scontent } from "./styles";

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
