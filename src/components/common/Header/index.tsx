import React from "react";
import { MonthType } from "../../containers/HomeContainer/types";
import { Scontent, Sitem } from "./styles";

type PropsType = {
  months: MonthType[];
  nowMonth: number;
  setNowMonth: Function;
};

function Header({ months, nowMonth, setNowMonth }: PropsType) {
  return (
    <Scontent>
      <div>
        {months.map((month, index) =>
          nowMonth === month.mesNumber ? (
            <Sitem
              className="selected"
              onClick={() => {
                setNowMonth(month.mesNumber);
              }}
            >
              <h1 key={index}>{month.name}</h1>
            </Sitem>
          ) : (
            <Sitem
              onClick={() => {
                setNowMonth(month.mesNumber);
              }}
            >
              <h1 key={index}>{month.name}</h1>
            </Sitem>
          )
        )}
      </div>
    </Scontent>
  );
}

export default Header;
