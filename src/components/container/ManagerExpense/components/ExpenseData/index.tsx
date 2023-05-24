import React from "react";
import { createExpense as createExpenseApi } from "src/api/expense";

import Input from "@commons/Input";
import { Button } from "@commons/Button";
import { Sbuttons, Scontainer, Sinputs, Sresume } from "./styles";
import { NewExpenseType } from "@interfaces/*";
import Cookies from "universal-cookie";
import Router from "next/router";
import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

const initialExpense = {
  name: "",
  date: "2022-01-01",
  persons: [],
};

export const ExpenseData = () => {
  const [newExpense, setNewExpense] =
    React.useState<NewExpenseType>(initialExpense);

  const { getExpenseData } = React.useContext(
    userContextData
  ) as userContextDataType;

  async function createExpense() {
    const cookies = new Cookies();

    const { user } = await cookies.get("expense-manager");

    createExpenseApi({ ...newExpense, email: user.email }).then(async () => {
      await getExpenseData();
      Router.push("/alterar-gasto");
    });
  }

  return (
    <Scontainer>
      <Sinputs>
        <Input
          placeholder="Nome do gasto"
          value={newExpense?.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setNewExpense({ ...newExpense, name: value });
          }}
        />
        {/* <InputWithSelectItems
          value={emailValue}
          placeholder="Email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setEmailValue(value);
          }}
          onClickAddItem={addEmail}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              addEmail();
            }
          }}
        /> */}
      </Sinputs>

      {/* <Sresume>
        <Slist>
          <h3>Pessoas que terão acesso a esse gasto:</h3>
          {newExpense.persons.length
            ? newExpense.persons.map(({ email }) => (
                <div>
                  <span>{email}</span>
                  <Trash
                    width={15}
                    height={15}
                    onClick={() => {
                      removeEmail(email);
                    }}
                  />
                </div>
              ))
            : "Nenhum email vinculado!"}
        </Slist>
      </Sresume> */}

      <Sbuttons>
        <Button background="#fff" color="#333" onClick={createExpense}>
          Cadastrar
        </Button>
      </Sbuttons>
    </Scontainer>
  );
};
