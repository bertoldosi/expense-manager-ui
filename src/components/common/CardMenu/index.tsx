import React, { ReactNode } from "react";
import { Button } from "../Button";
import { Add } from "../../icons/Add";
import { Repeat } from "../../icons/Repeat";

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
        {list.map((item) => (
          <span>
            <strong>{item.responsible}</strong>
            <strong> {formatMorney(item.amount)}</strong>
          </span>
        ))}
      </Ssection>
      {isFooter && <Sfooter>{isFooter}</Sfooter>}
    </Scontent>
  );
};
