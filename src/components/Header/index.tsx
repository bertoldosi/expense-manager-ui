import React from "react";

// import { ToggleDate } from "@components/ToggleDate";
import { Logo } from "@components/Logo";
import { User } from "@components/User";

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
