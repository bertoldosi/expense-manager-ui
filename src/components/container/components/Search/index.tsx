import React from "react";

import Input from "@commons/Input";
import { SelectFilter } from "@commons/SelectFilter";
import { ResponsibleValuesType } from "@containers/Home/types";

import { Scontent } from "./styles";
import InputTable from "../InputTable";

type PropsType = {
  setValueFilter: Function;
  options: ResponsibleValuesType[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const Search = ({ setValueFilter, options, onChange }: PropsType) => {
  return (
    <Scontent>
      <div>
        <InputTable type="checkbox" name="all" id="all" onChange={onChange} />
        <h3>Todos</h3>
      </div>
      <SelectFilter handlerValue={setValueFilter} options={options} />
    </Scontent>
  );
};
