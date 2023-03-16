import React from "react";
import { Card } from "@commons/Card";

import { Scontainer, Sbuttons } from "./styles";
import Link from "next/link";
import { UserAppContext, UserAppContextType } from "src/context/userAppContext";
import { ExpenseType } from "@interfaces/*";

export const ChangeExpense = () => {
  const { person } = React.useContext(UserAppContext) as UserAppContextType;

  const redirectHome = (expense: ExpenseType) => {
    console.log(expense);
  };

  return (
    <Card title="Escolha um gasto para gerenciar:">
      {person?.expenses.length ? (
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
