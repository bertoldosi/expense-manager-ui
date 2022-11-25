import { SelectValuType } from "@interfaces/*";
import React from "react";

import { Scontent } from "./styles";

type PropsType = {
  options: SelectValuType[];
  handlerValue: Function;
  valueFilter: string;
};

export const SelectFilter = ({
  options,
  handlerValue,
  valueFilter,
}: PropsType) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    handlerValue(value);
  };

  return (
    <Scontent>
      <select onChange={onChange} value={valueFilter}>
        <option value="todos">todos</option>
        {options.map((option, index) => (
          <option key={index} value={option.responsible || option.name}>
            {option.responsible || option.name}
          </option>
        ))}
      </select>
    </Scontent>
  );
};
