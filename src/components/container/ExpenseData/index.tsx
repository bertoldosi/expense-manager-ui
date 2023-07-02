import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Input from "@commons/Input";
import { Button } from "@commons/Button";
import instances from "@lib/axios-instance-internal";
import { userContextData, userContextDataType } from "@context/userContextData";

import { Sbuttons, Scontainer, Sinputs } from "./styles";

const initialExpense = {
  name: "",
};

export const ExpenseData = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { getUser } = React.useContext(userContextData) as userContextDataType;

  const [isResponse, setIsResponse] = React.useState<boolean>(false);

  const onSubmitExpense = useFormik({
    initialValues: initialExpense,
    onSubmit: async (values) => {
      setIsResponse(true);

      const newExpense = {
        ...values,
        userEmail: session?.user?.email,
      };

      await instances.post("api/expense", newExpense);
      getUser(session?.user?.email);
      setIsResponse(false);

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
        <Button text="Cadastrar" type="submit" disabled={isResponse} />
      </Sbuttons>
    </Scontainer>
  );
};
