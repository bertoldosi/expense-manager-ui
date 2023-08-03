import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import moment from "moment";

import { BsChevronDown } from "@icons/BsChevronDown";
import { Modal } from "@commons/Modal";

import { userContextData, userContextDataType } from "@context/userContextData";
import instances from "@lib/axios-instance-internal";
import { ExpenseType } from "@interfaces/*";

import { Scontainer, Sdate } from "./styles";
import { SelectDate } from "@commons/SelectDate";

const dates = [
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

  const { setExpense, setSelectedInstitution, setInstitution } = useContext(
    userContextData
  ) as userContextDataType;

  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
  const [valueYear, setValueYear] = useState<number>(() => {
    const date = moment().format("DD/MM/YYYY");
    const [_day, _month, year] = date.split("/");

    return Number(year);
  });
  const [valueMonth, setValueMonth] = useState<string>(() => {
    const date = moment().format("DD/MM/YYYY");
    const [_day, month, _year] = date.split("/");

    return month;
  });

  function handlerIsVisibleModal() {
    setOptionsModalVisible((prev) => !prev);
  }

  async function filter(numberMonth: string, numberYear: number) {
    const cookieValues = cookies.get("expense-manager");

    const date = `01/${numberMonth}/${numberYear}`;

    const newCookies = {
      ...cookieValues,
      filter: {
        ...cookieValues.filter,
        institution: null,
        institutions: {
          createAt: date,
        },
      },
    };

    instances
      .get("api/institution", {
        params: {
          createAt: date,
          expenseId: newCookies.filter?.expense?.id,
        },
      })

      .then((response) => {
        setExpense((prevExpense: ExpenseType) => ({
          ...prevExpense,
          institutions: response.data,
        }));

        setInstitution(null);
        setSelectedInstitution();
        cookies.set("expense-manager", newCookies);
        setOptionsModalVisible(false);
      });
  }

  function selectDate(numberMonth: string, numberYear: number) {
    setValueMonth(numberMonth);
    setValueYear(numberYear);

    filter(numberMonth, numberYear);
    setOptionsModalVisible(false);
  }

  async function setDateFilter() {
    const cookieValues = cookies.get("expense-manager");

    if (cookieValues?.filter?.institutions?.createAt) {
      const fullDateCookies = cookieValues?.filter?.institutions?.createAt;

      const [_day, month, year] = fullDateCookies.split("/");

      setValueYear(Number(year));
      setValueMonth(month);
    } else {
      const date = moment().format("DD/MM/YYYY");
      const [_day, month, year] = date.split("/");

      const newCookies = {
        ...cookieValues,
        filter: {
          ...cookieValues.filter,
          institutions: {
            createAt: `01/${month}/${year}`,
          },
        },
      };

      cookies.set("expense-manager", newCookies);

      setValueYear(Number(year));
      setValueMonth(month);
    }
  }

  function renderNameMonth(number: string): string {
    const nameMonth = dates.find((date) => date.number == number);

    return nameMonth?.name || "";
  }

  useEffect(() => {
    setDateFilter();
  }, []);

  return (
    <>
      <Scontainer>
        <Sdate onClick={handlerIsVisibleModal}>
          <div>
            <strong>{renderNameMonth(valueMonth || "")}</strong>
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
        <SelectDate
          valueYear={valueYear}
          handlerYear={setValueYear}
          valueMonth={valueMonth}
          selectDate={selectDate}
          dates={dates}
        />
      </Modal>
    </>
  );
}

export default InstitutionMenuFilter;
