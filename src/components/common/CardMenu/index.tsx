import React, { ReactNode } from "react";

import { Scontent, Sfooter, Sheader, Ssection } from "./styles";
import { ResponsibleValuesType } from "../../containers/HomeContainer/types";
import { formatMorney } from "../../../helpers/formatMorney";
import { sumAmountMoney } from "../../../helpers/sumAmountMoney";

type PropsType = {
  list: ResponsibleValuesType[];
  title: string;
  isFooter?: ReactNode;
  total: string;
};

const initialValue = 0;

export const CardMenu = ({ list, title, isFooter }: PropsType) => {
  const [sumTotal, setSumTotal] = React.useState(initialValue);

  React.useEffect(() => {
    setSumTotal(
      list
        .map((item: any) => item.amount)
        .reduce(
          (previousValue, currentValue) =>
            sumAmountMoney(previousValue, currentValue),
          initialValue
        )
    );
  }, [list]);

  return (
    <Scontent>
      <Sheader>
        <h1>{title}</h1>
      </Sheader>

      <Ssection>
        {list.map((item, index) => (
          <span key={index}>
            <strong>{item.responsible}</strong>
            <strong> {formatMorney(item.amount)}</strong>
          </span>
        ))}
        <span>
          <strong>TOTAL</strong>
          <strong>{formatMorney(sumTotal)}</strong>
        </span>
      </Ssection>
      {isFooter && <Sfooter>{isFooter}</Sfooter>}
    </Scontent>
  );
};
