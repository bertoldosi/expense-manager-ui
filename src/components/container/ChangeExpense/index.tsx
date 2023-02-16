import React from "react";
import { Card } from "@commons/Card";

import { Scontainer, Sbuttons } from "./styles";
import { Button } from "@commons/Button";
import { Checkbox } from "@commons/Checkbox";
import { UserContext, UserContextType } from "src/context/userContext";

export const ChangeExpense = () => {
  const { person } = React.useContext(UserContext) as UserContextType;

  return (
    <Card title="Escolha um gasto para gerenciar:">
      <Scontainer>
        {person?.expenses.map((expense) => (
          <Checkbox value="pessoal" name="expense" checked>
            {expense.name}
          </Checkbox>
        ))}
      </Scontainer>

      <Sbuttons>
        <Button background="#fff" color="#333">
          Continuar
        </Button>
        <a href="/gerenciar-gasto">Cadastrar</a>
      </Sbuttons>
    </Card>
  );
};
