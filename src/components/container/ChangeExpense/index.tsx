import React from "react";
import { Card } from "@commons/Card";

import { Scontainer, Sbuttons } from "./styles";
import { Button } from "@commons/Button";
import { Checkbox } from "@commons/Checkbox";

export const ChangeExpense = () => {
  return (
    <Card title="Escolha um gasto para gerenciar:">
      <Scontainer>
        <Checkbox value="pessoal" name="expense" checked>
          Pessoal
        </Checkbox>
        <Checkbox value="familia" name="expense">
          Familia
        </Checkbox>
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
