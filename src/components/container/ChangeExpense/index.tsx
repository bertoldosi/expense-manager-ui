import React from "react";
import { Card } from "@commons/Card";

import { Scontainer, Sbuttons } from "./styles";
import { Button } from "@commons/Button";
import { Checkbox } from "@commons/Checkbox";
import Link from "next/link";
import { UserAppContext, UserAppContextType } from "src/context/userAppContext";

export const ChangeExpense = () => {
  const { person } = React.useContext(UserAppContext) as UserAppContextType;

  return (
    <Card title="Escolha um gasto para gerenciar:">
      {person?.expenses.length ? (
        <Scontainer>
          {person?.expenses.map((expense) => (
            <Checkbox value="pessoal" name="expense" checked>
              {expense.name}
            </Checkbox>
          ))}
        </Scontainer>
      ) : (
        <Scontainer>
          <span>Não existe nenhum gasto vinculado ao seu email.</span>
        </Scontainer>
      )}

      <Sbuttons>
        {person?.expenses.length ? (
          <>
            <Button background="#fff" color="#333">
              Continuar
            </Button>

            <Link href="/gerenciar-gasto">Cadastrar</Link>
          </>
        ) : (
          <Link href="/gerenciar-gasto">Cadastrar</Link>
        )}
      </Sbuttons>
    </Card>
  );
};
