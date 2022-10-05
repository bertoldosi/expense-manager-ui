import React from "react";

import { SelectFilter } from "@commons/SelectFilter";
import { ResponsibleValuesType } from "@containers/Home/types";

import { GroupLeft, Scontent } from "./styles";
import InputTable from "../InputTable";
import { Button } from "@commons/Button";
import { Repeat } from "@icons/Repeat";
import { Trash } from "@icons/Trash";

type PropsType = {
  setValueFilter: Function;
  options: ResponsibleValuesType[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isItensSelect: boolean;
  handlerRepeat: React.MouseEventHandler<HTMLDivElement>;
  isRequest: boolean;
  removeShoppings: React.MouseEventHandler<HTMLDivElement>;
};

export const HeaderTable = ({
  setValueFilter,
  options,
  onChange,
  isItensSelect,
  handlerRepeat,
  isRequest,
  removeShoppings,
}: PropsType) => {
  return (
    <Scontent>
      <div>
        <InputTable type="checkbox" name="all" id="all" onChange={onChange} />
        <h3>Todos</h3>
      </div>

      <GroupLeft>
        {isItensSelect && (
          <>
            <Button
              disabled={isRequest}
              color="#fff"
              background="#B0C4DE"
              icon={<Repeat width={15} height={15} />}
              onClick={handlerRepeat}
            >
              Repetir
            </Button>
            <Button
              disabled={isRequest}
              color="#fff"
              background="#B0C4DE"
              icon={<Trash width={15} height={15} />}
              onClick={removeShoppings}
            >
              Incluir
            </Button>
          </>
        )}

        <SelectFilter handlerValue={setValueFilter} options={options} />
      </GroupLeft>
    </Scontent>
  );
};
