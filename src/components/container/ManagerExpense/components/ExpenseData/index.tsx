import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { InputWithSelectItems } from "@commons/InputWithSelectItems";
import { Slist } from "@containers/ManagerExpense/styles";
import { Trash } from "@icons/Trash";
import React from "react";

import { Sbuttons, Scontainer, Sinputs, Sresume } from "./styles";

export const ExpenseData = () => {
  return (
    <Scontainer>
      <Sinputs>
        <Input placeholder="Nome" />
        <InputWithSelectItems />
      </Sinputs>

      <Sresume>
        <Slist>
          <h3>Compartilhado com:</h3>
          <div>
            <span>matheus@gmail.com</span>
            <Trash width={15} height={15} />
          </div>

          <div>
            <span>matheus@gmail.com</span>
            <Trash width={15} height={15} />
          </div>
        </Slist>
      </Sresume>

      <Sbuttons>
        <Button background="#fff" color="#333">
          Cadastrar
        </Button>
      </Sbuttons>
    </Scontainer>
  );
};
