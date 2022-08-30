import React from "react";

import { Scontent } from "./styles";

import { BsChevronDown } from "../../../../icons/BsChevronDown";
import { BsChevronUp } from "../../../../icons/BsChevronUp";

type ItemType = {
  id: string;
  name: string;
  amount: string | number;
  expirationDate: string;
  showSubmenus?: boolean;
};

type PropsType = {
  item: ItemType;
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
