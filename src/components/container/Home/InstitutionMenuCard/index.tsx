import React, { ReactNode, useContext } from "react";
import { formatMorney } from "@helpers/formatMorney";
import { Scontent, Sfooter, Sheader, Ssection } from "./styles";
import { userContextData, userContextDataType } from "@context/userContextData";

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
  const { institution } = useContext(userContextData) as userContextDataType;

  return (
    <Scontent>
      <Sheader>
        <h1>{title.toUpperCase()}</h1>
      </Sheader>

      <Ssection>
        {institution?.categoryTotals?.map((item, index) => (
          <span key={index}>
            <strong>{item.category}</strong>
            <strong> {formatMorney(item.total)}</strong>
          </span>
        ))}
        <span>
          <strong>TOTAL</strong>
          <strong>{institution?.totalAmount}</strong>
        </span>
      </Ssection>
      {isFooter && <Sfooter>{isFooter}</Sfooter>}
    </Scontent>
  );
};

export default InstitutionMenuCard;
