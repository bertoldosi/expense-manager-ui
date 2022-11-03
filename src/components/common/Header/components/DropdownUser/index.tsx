import Dropdown from "@commons/Dropdown";
import { ToggleButtonTheme } from "@commons/ToggleButtonTheme";
import { User } from "@icons/User";
import React from "react";

import { Container } from "./styles";

export const DropdownUser = () => {
  return (
    <Dropdown
      position="right"
      hideChevronIcon
      icon={<User color="#fff" width={25} height={25} />}
    >
      <Container>
        <h1>DropdownMonth</h1>
        <h1>DropdownMonth</h1>
        <h1>DropdownMonth</h1>
        <h1>DropdownMonth</h1>
        <h1>DropdownMonth</h1>
        <h1>DropdownMonth</h1>
        <h1>DropdownMonth</h1>
        <h1>DropdownMonth</h1>
        <h1>DropdownMonth</h1>
        <ToggleButtonTheme />
      </Container>
    </Dropdown>
  );
};
