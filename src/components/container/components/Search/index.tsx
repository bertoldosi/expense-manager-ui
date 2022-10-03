import React from "react";

import { Select } from "@commons/Select";

import { Scontent } from "./styles";

type PropsType = {
  setValueFilter: Function;
};

export const Search = ({ setValueFilter }: PropsType) => {
  return (
    <Scontent>
      <h2>Filtrar por:</h2>
      <Select handlerValue={setValueFilter} options={[]} />
    </Scontent>
  );
};
