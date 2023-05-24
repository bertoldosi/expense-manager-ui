import React from "react";
import Router from "next/router";
import Cookies from "universal-cookie";

import Input from "@commons/Input";
import { Button } from "@commons/Button";
import { NewExpenseType } from "@interfaces/*";
import { Sbuttons, Scontainer, Sinputs } from "./styles";
import { createExpense as createExpenseApi } from "src/api/expense";
import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

const initialExpense = {
  name: "",
  date: "2022-01-01",
  persons: [],
};

export const ExpenseData = () => {
  const [newExpense, setNewExpense] =
    React.useState<NewExpenseType>(initialExpense);

  const { getExpenseData } = React.useContext(
    userContextData
  ) as userContextDataType;

  function onChangeExpenseName(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setNewExpense({ ...newExpense, name: value });
  }

  async function createExpense() {
    const cookies = new Cookies();
    const { user } = await cookies.get("expense-manager");

    createExpenseApi({ ...newExpense, email: user.email }).then(async () => {
      await getExpenseData();
      Router.push("/alterar-gasto");
    });
  }

  return (
    <Scontainer>
      <Sinputs>
        <Input
          placeholder="Nome do gasto"
          value={newExpense?.name}
          onChange={onChangeExpenseName}
        />
      </Sinputs>

      <Sbuttons>
        <Button background="#fff" color="#333" onClick={createExpense}>
          Cadastrar
        </Button>
      </Sbuttons>
    </Scontainer>
  );
};
