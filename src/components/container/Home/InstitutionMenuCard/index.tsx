import React, { ReactNode } from "react";
import { formatMorney } from "@helpers/formatMorney";
import { Scontent, Sfooter, Sheader, Ssection } from "./styles";

interface ItemType {
  name: string;
  amount: string;
}

type Props = {
  items?: ItemType[];
  title?: string;
  isFooter?: ReactNode;
};

const InstitutionMenuCard: React.FC<Props> = ({
  items = [],
  title = "SEM CARTÃO",
  isFooter,
}) => {
  const calculateTotal = (): string => {
    const total = items.reduce(
      (accumulator, currentItem) => accumulator + Number(currentItem.amount),
      0
    );
    return formatMorney(total.toString());
  };

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
          <strong>{calculateTotal()}</strong>
        </span>
      </Ssection>
      {isFooter && <Sfooter>{isFooter}</Sfooter>}
    </Scontent>
  );
};

export default InstitutionMenuCard;
