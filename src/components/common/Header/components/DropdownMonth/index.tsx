import Dropdown from "@commons/Dropdown";
import React from "react";

import { Scontainer, Sitem } from "./styles";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const DropdownMonth = () => {
  return (
    <Dropdown label="Dezembro" position="left">
      <Scontainer>
        {months.map((item) => (
          <Sitem>
            <span>{item}</span>
          </Sitem>
        ))}
      </Scontainer>
    </Dropdown>
  );
};
