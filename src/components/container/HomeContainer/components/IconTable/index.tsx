import React from "react";

import { Scontent } from "./styles";

import { BsChevronDown } from "../../../../icons/BsChevronDown";
import { BsChevronUp } from "../../../../icons/BsChevronUp";
import { InstitutionType } from "../../types";

type PropsType = {
  item: InstitutionType;
};

function IconTable({ item }: PropsType) {
  return item.showSubmenus ? (
    <Scontent>
      <BsChevronUp /> {item.name}
    </Scontent>
  ) : (
    <Scontent>
      <BsChevronDown /> {item.name}
    </Scontent>
  );
}

export default IconTable;
