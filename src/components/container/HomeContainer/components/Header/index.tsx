import React from "react";
import { Button } from "../../../../common/Button";
import { MonthType } from "../../types";
import { Scontent, ScontentButtons, ScontentLinks, Slink } from "./styles";

type PropsType = {
  monthList: MonthType[];
  nowMonth: number;
  setNowMonth: React.Dispatch<React.SetStateAction<number>>;
};

function Header({ monthList, setNowMonth, nowMonth }: PropsType) {
  return (
    <Scontent>
      <ScontentLinks>
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
      </ScontentLinks>

      <ScontentButtons>
        <Button backgroundColor="#333" color="#fff">
          Importar
        </Button>
      </ScontentButtons>
    </Scontent>
  );
}

export default Header;
