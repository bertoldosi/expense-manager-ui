import React, { ReactNode } from "react";

import { Scontent, Sfooter, Sheader, Ssection } from "./styles";
import { ResponsibleValuesType } from "../../containers/HomeContainer/types";
import { formatMorney } from "../../../helpers/formatMorney";

type PropsType = {
  list: ResponsibleValuesType[];
  title: string;
  isFooter?: ReactNode;
};

export const CardMenu = ({ list, title, isFooter }: PropsType) => {
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
      </Ssection>
      {isFooter && <Sfooter>{isFooter}</Sfooter>}
    </Scontent>
  );
};
