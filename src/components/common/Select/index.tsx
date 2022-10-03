import { ResponsibleValuesType } from "@containers/Home/types";
import React from "react";

import { Scontent } from "./styles";

type PropsType = {
  options: ResponsibleValuesType[];
  handlerValue: Function;
};

export const Select = ({ options, handlerValue }: PropsType) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    handlerValue(value);
  };

  return (
    <Scontent>
      <select onChange={onChange}>
        <option value="todos">todos</option>
        {options.map((option) => (
          <option value={option.responsible}>{option.responsible}</option>
        ))}
      </select>
    </Scontent>
  );
};
