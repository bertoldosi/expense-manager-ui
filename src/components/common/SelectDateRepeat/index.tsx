import React, { useState } from "react";

import { Scontainer, SmodalDate, SoptionsMonth, SselectDate } from "./styles";
import { Date } from "@icons/Date";
import { Exit } from "@icons/Exit";
import { Modal } from "@commons/Modal";
import { SelectDate } from "@commons/SelectDate";
import { ChevronDoubleLeft } from "@icons/ChevronDoubleLeft";
import { ChevronDoubleRight } from "@icons/ChevronDoubleRight";
import { Button } from "@commons/Button";

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
  const [date, setDate] = useState("");

  const [dates, setDates] = useState([
    "01/07/2023",
    "01/08/2023",
    "01/09/2023",
  ]);

  function handlerIsVisibleModal() {
    setIsVisibleModal((prev) => !prev);
  }

  return (
    <>
      <Scontainer>
        {dates.map((date) => (
          <SselectDate>
            <span>{date}</span>
            <Exit width="1.5rem" height="1.5rem" />
          </SselectDate>
        ))}

        <SselectDate onClick={handlerIsVisibleModal}>
          <span>Selecione a data</span>
          <Date width="1.5rem" height="1.5rem" />
        </SselectDate>

        <SmodalDate>
          <header>
            <ChevronDoubleLeft width="3rem" onClick={() => {}} />
            <span>{2023}</span>
            <ChevronDoubleRight width="3rem" onClick={() => {}} />
          </header>

          <div>
            {optionsDates.map((month) => (
              <SoptionsMonth>{month.name}</SoptionsMonth>
            ))}
          </div>

          <Button text="Fechar" width="10rem" />
        </SmodalDate>
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
