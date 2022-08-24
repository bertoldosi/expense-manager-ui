import React from "react";

import { Scontent } from "./styles";

import { BsChevronDown } from "../../../../icons/BsChevronDown";
import { BsChevronUp } from "../../../../icons/BsChevronUp";

type ItemType = {
  id: string;
  institution: string;
  amount: string;
  expiration_date: string;
  showSubmenus?: boolean;
};

type PropsType = {
  item: ItemType;
};

function IconTable({ item }: PropsType) {
  return item.showSubmenus ? (
    <Scontent>
      <BsChevronUp /> {item.institution}
    </Scontent>
  ) : (
    <Scontent>
      <BsChevronDown /> {item.institution}
    </Scontent>
  );
}

export default IconTable;
