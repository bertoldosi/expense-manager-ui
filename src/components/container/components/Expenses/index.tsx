import React from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { Add } from "@icons/Add";
import { Table } from "@containers/components/Table";

import { updateInstitutionShoppings } from "@graphqls/institution";
import { sumAmountResponsible } from "@helpers/sumAmountResponsible";
import { sumAmountMoney } from "@helpers/sumAmountMoney";
import { focusInput } from "@helpers/focusInput";
import { maskMorney } from "@helpers/masks";

import { Scontent, Sheader } from "./styles";

import { InstitutionType, MonthType, ShoppingType } from "../../Home/types";
import { customToast } from "@helpers/customToast";

type PropsType = {
  institution: InstitutionType;
  monthList: MonthType[];
  setMonthList: Function;
  month: MonthType;
  getMonths: Function;
};

const initialNewShopping = {
  reference: uuidv4(),
  description: "",
  amount: "",
  responsible: "",
  select: false,
  status_paid: "aberto",
};

export const Expenses = ({
  institution,
  monthList,
  setMonthList,
  month,
  getMonths,
}: PropsType) => {
  const [request, setRequest] = React.useState(false);
  const [newShopping, setNewShopping] =
    React.useState<ShoppingType>(initialNewShopping);

  const onChangeAddShopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewShopping((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

  const includeShopping = async (institutionReference: string) => {
    setRequest(true);

    const shopping = {
      ...newShopping,
      reference: uuidv4(),
    };

    updateInstitutionShoppings(institutionReference, [shopping])
      .then(() => {
        getMonths();
        customToast("success", "Adicionado com sucesso!");
      })

      .catch(() => {
        customToast("error", "Tente novamente!");
      })

      .finally(() => {
        setNewShopping(initialNewShopping);
        setRequest(false);
        focusInput("description");
      });
  };

  return (
    <Scontent>
      <Sheader>
        <Input
          autoFocus
          name="description"
          placeholder="Descrição do item"
          id={newShopping.reference}
          value={newShopping.description}
          onChange={onChangeAddShopping}
        />
        <Input
          disabled={request}
          name="amount"
          placeholder="R$ 00,00"
          id={newShopping.reference}
          value={newShopping.amount}
          onChange={onChangeAddShopping}
        />
        <Input
          disabled={request}
          name="responsible"
          placeholder="Nome do responsavel"
          id={newShopping.reference}
          value={newShopping.responsible}
          onChange={onChangeAddShopping}
        />
        <Button
          disabled={request}
          color="#fff"
          background="#B0C4DE"
          icon={<Add width={15} height={15} />}
          onClick={() => {
            includeShopping(institution.reference);
          }}
        >
          Adicionar
        </Button>
      </Sheader>
      <Table
        institution={institution}
        month={month}
        monthList={monthList}
        setMonthList={setMonthList}
        request={request}
        setRequest={setRequest}
        getMonths={getMonths}
      />
    </Scontent>
  );
};
