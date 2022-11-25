import React from "react";
import { Card } from "@commons/Card";

import {
  Scontainer,
  Sbuttons,
  Sresume,
  Sname,
  Slist,
  Sexpenses,
} from "./styles";
import { Button } from "@commons/Button";
import { InputWithSelectItems } from "@commons/InputWithSelectItems";
import Input from "@commons/Input";
import { Trash } from "@icons/Trash";
import { Edit } from "@icons/Edit";

export const ManagerExpense = () => {
  return (
    <>
      <Card title="Novo gasto:">
        <Scontainer>
          <Input placeholder="Nome" />
          <InputWithSelectItems />
        </Scontainer>

        <Sresume>
          <Sname>
            <h3>Nome:</h3>
            <span>Outro gasto</span>
          </Sname>
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
      </Card>

      <Card title="Gerenciar gastos:">
        <Sexpenses>
          <Slist>
            <div>
              <span>matheus@gmail.com</span>
              <div>
                <Edit width={15} height={15} />
                <Trash width={15} height={15} />
              </div>
            </div>
          </Slist>
        </Sexpenses>
      </Card>
    </>
  );
};
