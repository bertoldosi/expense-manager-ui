import React from "react";

import { Select } from "@commons/Select";

import { Scontent } from "./styles";
import { ResponsibleValuesType } from "@containers/Home/types";

type PropsType = {
  setValueFilter: Function;
  options: ResponsibleValuesType[];
};

export const Search = ({ setValueFilter, options }: PropsType) => {
  return (
    <Scontent>
      <h2>Filtrar por:</h2>
      <Select handlerValue={setValueFilter} options={options} />
    </Scontent>
  );
};
