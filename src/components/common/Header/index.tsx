import React from "react";

import { Sconfig, Scontainer, Scontent } from "./styles";
import { DropdownMonth } from "./components/DropdownMonth";
import { DropdownUser } from "./components/DropdownUser";

function Header() {
  return (
    <Scontainer>
      <Scontent>
        <DropdownMonth />
        <Sconfig>
          <DropdownUser />
        </Sconfig>
      </Scontent>
    </Scontainer>
  );
}

export default Header;
