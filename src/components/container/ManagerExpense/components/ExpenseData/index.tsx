import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Cookies from "universal-cookie";

import Input from "@commons/Input";
import { Button } from "@commons/Button";
import { Sbuttons, Scontainer, Sinputs } from "./styles";
import { createExpense as createExpenseApi } from "src/api/expense";
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
  const router = useRouter();

  const [isResponse, setIsResponse] = React.useState<boolean>(false);

  const { getPerson } = React.useContext(
    userContextData
  ) as userContextDataType;

  const onSubmitExpense = useFormik({
    initialValues: initialExpense,
    onSubmit: async (values) => {
      setIsResponse(true);
      const cookies = new Cookies();
      const { user } = await cookies.get("expense-manager");

      const newExpense = {
        ...values,
        email: user.email,
      };

      await createExpenseApi(newExpense);
      setIsResponse(false);

      await getPerson(user);
      router.push("/alterar-gasto");
    },
  });

  return (
    <Scontainer onSubmit={onSubmitExpense.handleSubmit}>
      <Sinputs>
        <Input
          id="name"
          name="name"
          autoFocus
          placeholder="Nome do gasto"
          onChange={onSubmitExpense.handleChange}
        />
      </Sinputs>

      <Sbuttons>
        <Button
          background="#fff"
          color="#333"
          type="submit"
          disabled={isResponse}
        >
          Cadastrar
        </Button>
      </Sbuttons>
    </Scontainer>
  );
};
