import { Save } from "@icons/Save";
import React from "react";

import { Scontainer } from "./styles";

export const InputWithSelectItems = () => {
  return (
    <Scontainer>
      <input placeholder="Email" />
      <Save width={20} height={20} />
    </Scontainer>
  );
};
