import React from "react";

import { Scontent, ScontentSelectedDate, SmonthItem } from "./styles";
import { ChevronDoubleLeft } from "@icons/ChevronDoubleLeft";
import { ChevronDoubleRight } from "@icons/ChevronDoubleRight";
import { Button } from "@commons/Button";

interface DateType {
  name: string;
  number: string;
}

interface SelectDateType {
  valueYear: number;
  handlerYear: Function;
  valueMonth: string;
  changeMonth: Function;
  buttonOnClick: React.MouseEventHandler<HTMLButtonElement>;
  dates: DateType[];
}

export const SelectDate = ({
  valueYear,
  handlerYear,
  valueMonth,
  changeMonth,
  buttonOnClick,
  dates,
}: SelectDateType) => {
  function nextYear() {
    if (valueYear) handlerYear((prevValueYear: number) => prevValueYear + 1);
  }

  function previousYear() {
    if (valueYear) handlerYear((prevValueYear: number) => prevValueYear - 1);
  }

  return (
    <Scontent>
      <header>
        <ChevronDoubleLeft width="3rem" onClick={previousYear} />
        <span>{valueYear}</span>
        <ChevronDoubleRight width="3rem" onClick={nextYear} />
      </header>

      <ScontentSelectedDate>
        {dates.map((date) => (
          <SmonthItem
            isSelected={valueMonth === date.number}
            key={date.number}
            onClick={() => {
              changeMonth(date.number);
            }}
          >
            {date.name}
          </SmonthItem>
        ))}
      </ScontentSelectedDate>

      <Button text="Aplicar" width="20rem" onClick={buttonOnClick} />
    </Scontent>
  );
};
