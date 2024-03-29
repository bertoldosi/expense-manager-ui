import React, { ReactNode } from "react";

import { formatMorney } from "@helpers/formatMorney";
import { sumAmountMoney } from "@helpers/sumAmountMoney";
import { Scontent, Sfooter, Sheader, Ssection } from "./styles";
import { ResponsibleValuesType } from "@interfaces/";

type PropsType = {
  list: ResponsibleValuesType[] | undefined;
  title: string;
  isFooter?: ReactNode;
  background?: string;
};

const initialValue = 0;

export const CardMenu = ({
  list = [],
  title,
  isFooter,
  background,
}: PropsType) => {
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
      <Sheader background={background}>
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
