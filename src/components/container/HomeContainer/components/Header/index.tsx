import React from "react";
import { Button } from "../../../../common/Button";
import { MonthType } from "../../types";
import { Scontent, Slink } from "./styles";

type PropsType = {
  monthList: MonthType[];
  nowMonth: number;
  setNowMonth: React.Dispatch<React.SetStateAction<number>>;
};

function Header({ monthList, setNowMonth, nowMonth }: PropsType) {
  return (
    <Scontent>
      {monthList.map((month) => (
        <Slink
          isSeleted={month.mesNumber === nowMonth}
          type="button"
          onClick={() => {
            setNowMonth(month.mesNumber);
          }}
        >
          {month.name}
        </Slink>
      ))}

      {/* <Button
        backgroundColor="#FFF"
        color="#333"
        onClick={includeNewInstitution}
      >
        Adicionar
      </Button>
      <Button backgroundColor="#333" color="#fff">
        Importar
      </Button> */}
    </Scontent>
  );
}

export default Header;
