import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { ChevronDoubleLeft } from "@icons/ChevronDoubleLeft";
import { ChevronDoubleRight } from "@icons/ChevronDoubleRight";
import { BsChevronDown } from "@icons/BsChevronDown";
import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";

import {
  Scontainer,
  ScontentModal,
  ScontentSelectedDate,
  Sdate,
  SmonthItem,
} from "./styles";

const DATES = [
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

function InstitutionMenuFilter() {
  const cookies = new Cookies();

  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);

  const [valueYear, setValueYear] = useState<number>(() => {
    const cookieValues = cookies.get("expense-manager");
    const fullDateCookies = new Date(cookieValues.filter.institution.createAt);
    const fullDateNow = new Date();

    return fullDateCookies.getFullYear() || fullDateNow.getFullYear();
  });

  const [valueMonth, setValueMonth] = useState<string>(() => {
    const cookieValues = cookies.get("expense-manager");
    const fullDateCookies = new Date(
      cookieValues.filter.institution.createAt
    ).toISOString();

    const [_year, month, _day] = fullDateCookies.split("-");

    return month;
  });

  function handlerIsVisibleModal() {
    setOptionsModalVisible((prev) => !prev);
  }

  function changeMonth(number: string) {
    setValueMonth(number);
  }

  function nextYear() {
    setValueYear(valueYear + 1);
  }

  function previousYear() {
    setValueYear(valueYear - 1);
  }

  function filter() {
    const cookieValues = cookies.get("expense-manager");

    const dateFormatted = `${valueYear}/${valueMonth}/01`;
    const date = new Date(dateFormatted).toISOString();

    const newCookies = {
      ...cookieValues,
      filter: {
        ...cookieValues.filter,
        institution: {
          ...cookieValues.filter.institution,
          createAt: date,
        },
      },
    };

    cookies.set("expense-manager", newCookies);
    setOptionsModalVisible(false);
  }

  return (
    <>
      <Scontainer>
        <Sdate onClick={handlerIsVisibleModal}>
          <div>
            <strong>{DATES[Number(valueMonth) - 1].name}</strong>
            <span>de</span>
            <strong>{valueYear}</strong>
          </div>

          <BsChevronDown width="2rem" height="2rem" />
        </Sdate>
      </Scontainer>

      <Modal
        isVisible={isOptionsModalVisible}
        handlerIsVisible={handlerIsVisibleModal}
        title="Escolhe o mês que deseja visualizar"
      >
        <ScontentModal>
          <header>
            <ChevronDoubleLeft width="3rem" onClick={previousYear} />
            <span>{valueYear}</span>
            <ChevronDoubleRight width="3rem" onClick={nextYear} />
          </header>

          <ScontentSelectedDate>
            {DATES.map((date) => (
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

          <Button text="Aplicar" width="20rem" onClick={filter} />
        </ScontentModal>
      </Modal>
    </>
  );
}

export default InstitutionMenuFilter;
