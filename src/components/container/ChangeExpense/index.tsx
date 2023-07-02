import React, { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Cookies from "universal-cookie";
import { useSession } from "next-auth/react";

import { ExpenseType } from "@interfaces/*";
import { Card } from "@commons/Card";

import { userContextData, userContextDataType } from "@context/userContextData";

import { Scontainer, Sbuttons } from "./styles";

export const ChangeExpense = () => {
  const cookies = new Cookies();
  const { data: session } = useSession();
  const { getUser } = React.useContext(userContextData) as userContextDataType;

  const { user } = React.useContext(userContextData) as userContextDataType;

  function redirectHome(expense: ExpenseType) {
    const newCookies = {
      filter: {
        expense: {
          id: expense.id,
          name: expense.name,
        },
      },
    };

    cookies.set("expense-manager", newCookies);
    Router.push("/");
  }

  useEffect(() => {
    getUser(session?.user?.email);
  }, [session]);

  return (
    <Card title="Escolha um gasto para gerenciar:">
      {user?.expenses?.length ? (
        <Scontainer>
          {user.expenses.map((expense) => (
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
