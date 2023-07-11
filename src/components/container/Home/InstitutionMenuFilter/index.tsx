import React, { useContext, useEffect, useState } from "react";
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
import { userContextData, userContextDataType } from "@context/userContextData";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import { ExpenseType } from "@interfaces/*";

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

  const { setExpense } = useContext(userContextData) as userContextDataType;

  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);

  const [valueYear, setValueYear] = useState<number>(() => {
    const cookieValues = cookies.get("expense-manager");

    if (cookieValues?.filter?.institutions?.createAt) {
      const fullDateCookies = new Date(
        cookieValues?.filter?.institutions?.createAt
      );

      return fullDateCookies.getFullYear();
    }

    const fullDateNow = new Date();
    return fullDateNow.getFullYear();
  });

  const [valueMonth, setValueMonth] = useState<string>(() => {
    const cookieValues = cookies.get("expense-manager");

    if (cookieValues?.filter?.institutions?.createAt) {
      const fullDateCookies = new Date(
        cookieValues?.filter?.institutions?.createAt
      ).toISOString();

      const [_year, month, _day] = fullDateCookies.split("-");

      return month;
    }

    return "01";
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

  async function filter() {
    const cookieValues = cookies.get("expense-manager");

    const dateFormatted = `${valueYear}/${valueMonth}/01`;
    const date = new Date(dateFormatted).toISOString();

    const newCookies = {
      ...cookieValues,
      filter: {
        ...cookieValues.filter,
        institutions: {
          createAt: date,
        },
      },
    };

    instances
      .get("api/institution", {
        params: {
          createAt: date,
        },
      })
      .then((response) => {
        setExpense((prevExpense: ExpenseType) => ({
          ...prevExpense,
          institutions: response.data,
        }));

        cookies.set("expense-manager", newCookies);
        setOptionsModalVisible(false);
      })
      .catch(() => {
        customToast("error", "Algo deu errado, tente novamente mais tarde!");
      });
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
