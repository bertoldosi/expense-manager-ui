import React from "react";

import { SelectFilter } from "@commons/SelectFilter";
import { ResponsibleValuesType } from "@containers/Home/types";

import { GroupLeft, Scontent } from "./styles";
import InputTable from "../InputTable";
import { Button } from "@commons/Button";
import { Repeat } from "@icons/Repeat";
import { Trash } from "@icons/Trash";
import { Edit } from "@icons/Edit";
import { theme } from "src/styles/theme";

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
            <Button
              disabled={isRequest}
              color="#fff"
              background={theme.backgroundButton}
              icon={<Edit width={15} height={15} />}
              onClick={() => {
                setIsVisible(true);
              }}
            >
              Editar
            </Button>
            <Button
              disabled={isRequest}
              color="#fff"
              background={theme.backgroundButton}
              icon={<Repeat width={15} height={15} />}
              onClick={handlerRepeat}
            >
              Repetir
            </Button>
            <Button
              disabled={isRequest}
              color="#fff"
              background={theme.backgroundButton}
              icon={<Trash width={15} height={15} />}
              onClick={removeShoppings}
            >
              Incluir
            </Button>
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
