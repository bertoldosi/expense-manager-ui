import React from "react";
import { createExpense as createExpenseApi } from "src/api/expense";
import { InputWithSelectItems } from "@commons/InputWithSelectItems";
import { Slist } from "@containers/ManagerExpense/styles";

import Input from "@commons/Input";
import { Trash } from "@icons/Trash";
import { Button } from "@commons/Button";
import { Sbuttons, Scontainer, Sinputs, Sresume } from "./styles";
import { NewExpenseType } from "@interfaces/*";

const initialExpense = {
  name: "",
  date: "2022-01-01",
  persons: [],
};

export const ExpenseData = () => {
  const [emailValue, setEmailValue] = React.useState<string>("");
  const [newExpense, setNewExpense] =
    React.useState<NewExpenseType>(initialExpense);

  function addEmail() {
    if (!emailValue) {
      return alert("Digite um email!");
    }

    const isEmailOnExpenseEmails = !!newExpense.persons.find(
      (email) => email.email === emailValue
    );

    if (isEmailOnExpenseEmails) {
      alert("Já está na lista!");
      setEmailValue("");

      return;
    }

    setNewExpense({
      ...newExpense,
      persons: [...newExpense.persons, { email: emailValue }],
    });

    return setEmailValue("");
  }

  function removeEmail(emailDelete: string) {
    return setNewExpense({
      ...newExpense,
      persons: newExpense.persons.filter(
        (emailMap) => emailDelete !== emailMap.email
      ),
    });
  }

  async function createExpense() {
    console.log(newExpense);

    createExpenseApi(newExpense).then(() => {
      location.reload();
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
        <InputWithSelectItems
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
        />
      </Sinputs>

      <Sresume>
        <Slist>
          <h3>Compartilhado com:</h3>
          {newExpense.persons.map(({ email }) => (
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
          ))}
        </Slist>
      </Sresume>

      <Sbuttons>
        <Button background="#fff" color="#333" onClick={createExpense}>
          Cadastrar
        </Button>
      </Sbuttons>
    </Scontainer>
  );
};
