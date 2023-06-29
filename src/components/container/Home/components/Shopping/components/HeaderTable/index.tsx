import React from "react";

import { GroupLeft, Scontent } from "./styles";
import InputTable from "../InputTable";
import { Button } from "@commons/Button";
import {
  UserContextConfig,
  UserContextConfigType,
} from "src/context/userContextConfig";

type PropsType = {
  setValueFilter: Function;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isItensSelect: boolean;
  handlerRepeat: React.MouseEventHandler<HTMLDivElement>;
  isRequest: boolean;
  removeShoppings: React.MouseEventHandler<HTMLDivElement>;
  setIsVisible: Function;
  valueFilter: string;
};

export const HeaderTable = ({
  setValueFilter,
  onChange,
  isItensSelect,
  handlerRepeat,
  isRequest,
  removeShoppings,
  setIsVisible,
  valueFilter,
}: PropsType) => {
  const { theme } = React.useContext(
    UserContextConfig
  ) as UserContextConfigType;

  return (
    <Scontent>
      {/* <div>
        <InputTable
          type="checkbox"
          name="all"
          checked={isItensSelect}
          id="all"
          onChange={onChange}
        />
        <h3>Todos</h3>
      </div>

      <GroupLeft>
        {isItensSelect && (
          <>
            <Button color="#fff">Editar</Button>
            <Button color="#fff">Repetir</Button>
            <Button color="#fff">Incluir</Button>
          </>
        )}

        <SelectFilter
          handlerValue={setValueFilter}
          options={options}
          valueFilter={valueFilter}
        />
      </GroupLeft> */}
    </Scontent>
  );
};
