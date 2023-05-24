import React from "react";
import Link from "next/link";
import Router from "next/router";
import Cookies from "universal-cookie";

import { Scontainer, Sbuttons } from "./styles";
import { ExpenseType } from "@interfaces/*";
import { Card } from "@commons/Card";

import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

export const ChangeExpense = () => {
  const cookies = new Cookies();
  const { person } = React.useContext(userContextData) as userContextDataType;

  function redirectHome(expense: ExpenseType) {
    const { user } = cookies.get("expense-manager");

    const newCookies = {
      user,
      filter: {
        expense: {
          id: expense.id,
          name: expense.name,
        },
      },
    };

    cookies.set("expense-manager", newCookies);
    Router.push("/", expense.id);
  }

  return (
    <Card title="Escolha um gasto para gerenciar:">
      {person?.expenses?.length ? (
        <Scontainer>
          {person?.expenses.map((expense) => (
            <span
              onClick={() => {
                redirectHome(expense);
              }}
            >
              {expense?.name}
            </span>
          ))}
        </Scontainer>
      ) : (
        <Scontainer>
          <strong>Não existe nenhum gasto vinculado ao seu email.</strong>
        </Scontainer>
      )}

      <Sbuttons>
        <Link href="/gerenciar-gasto">Cadastrar</Link>
      </Sbuttons>
    </Card>
  );
};
