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

  const { getUser, user } = React.useContext(
    userContextData
  ) as userContextDataType;

  function redirectHome(expense: ExpenseType) {
    const newCookies = {
      filter: {
        expense: {
          id: expense.id,
          name: expense.name,
        },
        institution: expense.institutions?.length && expense.institutions[0],
      },
    };

    cookies.set("expense-manager", newCookies);
    Router.push("/");
  }

  useEffect(() => {
    if (session?.user?.email) getUser(session?.user?.email);
  }, [session]);

  return (
    <Card title="Escolha um gasto para gerenciar:">
      {user?.expenses?.length ? (
        <Scontainer>
          {user.expenses.map((expense) => (
            <span
              key={expense.id}
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
        <Link href="/gerenciar-gasto">Cadastrar ou Editar</Link>
      </Sbuttons>
    </Card>
  );
};
