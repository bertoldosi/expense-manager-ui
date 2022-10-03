import { SelectValuType } from "@containers/Home/types";
import React from "react";

import { Scontent } from "./styles";

type PropsType = {
  options: SelectValuType[];
  name: string;
  value: string;
  id: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const SelectStatus = ({
  options,
  name,
  value,
  id,
  onChange,
}: PropsType) => {
  return (
    <Scontent>
      <select onChange={onChange} name={name} value={value} id={id}>
        {options.map((option, index) => (
          <option key={index}>{option.name}</option>
        ))}
      </select>
    </Scontent>
  );
};
