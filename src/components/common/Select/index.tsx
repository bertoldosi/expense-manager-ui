import { SelectValuType } from "@containers/Home/types";
import React from "react";

import { Scontent } from "./styles";

type PropsType = {
  options: SelectValuType[];
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
        {options.map((option) => (
          <option value={option.responsible || option.name}>
            {option.responsible || option.name}
          </option>
        ))}
      </select>
    </Scontent>
  );
};
