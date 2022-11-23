import React from "react";
import { Card } from "@commons/Card";

import { Scontainer, Sbuttons } from "./styles";
import { Button } from "@commons/Button";

export const ChangeExpense = () => {
  return (
    <Card title="Escolha um gasto para gerenciar:">
      <Scontainer>
        <h1>ChangeExpense</h1>
      </Scontainer>

      <Sbuttons>
        <Button background="#fff" color="#333">
          Continuar
        </Button>
        <a href="/manager-expense">Cadastrar</a>
      </Sbuttons>
    </Card>
  );
};
