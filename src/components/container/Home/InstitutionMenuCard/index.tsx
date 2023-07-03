import React, { ReactNode } from "react";

import { formatMorney } from "@helpers/formatMorney";
import { Scontent, Sfooter, Sheader, Ssection } from "./styles";

interface ItemsType {
  name: string;
  amount: string;
}

type PropsType = {
  items?: ItemsType[];
  title?: string;
  isFooter?: ReactNode;
};

function InstitutionMenuCard({
  items = [],
  title = "SEM CARTÃO",
  isFooter,
}: PropsType) {
  return (
    <Scontent>
      <Sheader>
        <h1>{title.toUpperCase()}</h1>
      </Sheader>

      <Ssection>
        {items.map((item, index) => (
          <span key={index}>
            <strong>{item.name}</strong>
            <strong> {formatMorney(item.amount)}</strong>
          </span>
        ))}
        <span>
          <strong>TOTAL</strong>
          <strong>{"R$ 00,00"}</strong>
        </span>
      </Ssection>
      {isFooter && <Sfooter>{isFooter}</Sfooter>}
    </Scontent>
  );
}

export default InstitutionMenuCard;
