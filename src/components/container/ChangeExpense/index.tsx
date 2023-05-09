import React from "react";
import { Card } from "@commons/Card";

import { Scontainer, Sbuttons } from "./styles";
import Link from "next/link";
import { UserAppContext, UserAppContextType } from "src/context/userAppContext";
import { ExpenseType } from "@interfaces/*";
import Cookies from "universal-cookie";
import Router from "next/router";

export const ChangeExpense = () => {
  const cookies = new Cookies();

  const { person } = React.useContext(UserAppContext) as UserAppContextType;

  const redirectHome = (expense: ExpenseType) => {
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

    Router.push("/");
  };

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
              {expense.name}
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
