import React, { useState } from "react";

import { Scontainer, SmodalDate, SoptionsMonth, SselectDate } from "./styles";
import { Date } from "@icons/Date";
import { Exit } from "@icons/Exit";
import { ChevronDoubleLeft } from "@icons/ChevronDoubleLeft";
import { ChevronDoubleRight } from "@icons/ChevronDoubleRight";
import { Button } from "@commons/Button";
import moment from "moment";

const optionsDates = [
  { name: "JAN", number: "01" },
  { name: "FEV", number: "02" },
  { name: "MAR", number: "03" },
  { name: "ABR", number: "04" },
  { name: "MAI", number: "05" },
  { name: "JUN", number: "06" },
  { name: "JUL", number: "07" },
  { name: "AGO", number: "08" },
  { name: "SET", number: "09" },
  { name: "OUT", number: "10" },
  { name: "NOV", number: "11" },
  { name: "DEZ", number: "12" },
];

function SelectDateRepeat() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [dates, setDates] = useState([""]);
  const [year, setYear] = useState(() => {
    const date = moment().format("DD/MM/YYYY");
    const [_day, _month, year] = date.split("/");

    return Number(year);
  });

  function handlerIsVisibleModal() {
    setIsVisibleModal((prev) => !prev);
  }

  function nextYear() {
    setYear((prevValueYear: number) => prevValueYear + 1);
  }

  function previousYear() {
    setYear((prevValueYear: number) => prevValueYear - 1);
  }

  function addDate(month: string) {
    const date = `01/${month}/${year}`;

    setDates((prev) => [...prev, date]);
    handlerIsVisibleModal();
  }

  function removeDate(dateRemove: string) {
    const newDates = dates.filter((date) => date !== dateRemove);

    setDates(newDates);
  }

  return (
    <>
      <Scontainer>
        {dates.map(
          (date) =>
            date && (
              <SselectDate key={date}>
                <span>{date}</span>
                <Exit
                  width="1.5rem"
                  height="1.5rem"
                  type="button"
                  onClick={() => {
                    removeDate(date);
                  }}
                />
              </SselectDate>
            )
        )}

        <SselectDate onClick={handlerIsVisibleModal}>
          <span>Selecione a data</span>
          <Date width="1.5rem" height="1.5rem" type="button" />
        </SselectDate>

        {isVisibleModal && (
          <SmodalDate>
            <header>
              <ChevronDoubleLeft
                width="3rem"
                onClick={previousYear}
                type="button"
              />
              <span>{year}</span>
              <ChevronDoubleRight
                width="3rem"
                onClick={nextYear}
                type="button"
              />
            </header>

            <div>
              {optionsDates.map((month) => (
                <SoptionsMonth
                  key={month.number}
                  onClick={() => {
                    addDate(month.number);
                  }}
                >
                  {month.name}
                </SoptionsMonth>
              ))}
            </div>

            <Button
              text="Fechar"
              width="10rem"
              onClick={handlerIsVisibleModal}
            />
          </SmodalDate>
        )}
      </Scontainer>

      {/* <Modal
        isVisible={isVisibleModal}
        handlerIsVisible={handlerIsVisibleModal}
        title="Escolha a data"
      >
        <SelectDate
          valueYear={2023}
          handlerYear={() => {}}
          valueMonth={"07"}
          changeMonth={() => {}}
          buttonOnClick={() => {}}
          dates={optionsDates}
        />
      </Modal> */}
    </>
  );
}

export default SelectDateRepeat;
