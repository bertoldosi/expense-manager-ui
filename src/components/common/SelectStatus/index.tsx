import { SelectValuType } from "@containers/Home/types";
import React from "react";

import { Scontent } from "./styles";

type PropsType = {
  options: SelectValuType[];
  name: string;
  value: string;
  id: string;
  optionClassName?: string;
  selectClassName?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const SelectStatus = ({
  options,
  name,
  value,
  id,
  onChange,
  optionClassName,
  selectClassName,
}: PropsType) => {
  return (
    <Scontent>
      <select
        className={selectClassName}
        onChange={onChange}
        name={name}
        value={value}
        id={id}
      >
        {options.map((option, index) => (
          <option className={optionClassName} key={index}>
            {option.name}
          </option>
        ))}
      </select>
    </Scontent>
  );
};
