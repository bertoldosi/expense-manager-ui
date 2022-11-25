import React from "react";

import { SelectFilter } from "@commons/SelectFilter";

import { GroupLeft, Scontent } from "./styles";
import InputTable from "../InputTable";
import { Button } from "@commons/Button";
import { Repeat } from "@icons/Repeat";
import { Trash } from "@icons/Trash";
import { Edit } from "@icons/Edit";
import { UserContext, UserContextType } from "src/context/userContext";
import { ResponsibleValuesType } from "@interfaces/*";

type PropsType = {
  setValueFilter: Function;
  options: ResponsibleValuesType[] | undefined;
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
  options = [],
  onChange,
  isItensSelect,
  handlerRepeat,
  isRequest,
  removeShoppings,
  setIsVisible,
  valueFilter,
}: PropsType) => {
  const { theme } = React.useContext(UserContext) as UserContextType;

  return (
    <Scontent>
      <div>
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
      </GroupLeft>
    </Scontent>
  );
};
