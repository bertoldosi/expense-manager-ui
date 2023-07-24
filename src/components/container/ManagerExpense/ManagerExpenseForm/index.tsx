import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Input from "@commons/Input";
import { Button } from "@commons/Button";
import instances from "@lib/axios-instance-internal";
import { userContextData, userContextDataType } from "@context/userContextData";

import { Sbuttons, Scontainer, Sinputs } from "./styles";
import validationSchema from "./validations";
import { customToast } from "@commons/CustomToast";

interface InitialExpenseUpdateType {
  id: string;
  name: string;
}
interface ManagerExpenseFormType {
  expenseInitial?: InitialExpenseUpdateType | null;
}

function ManagerExpenseForm({ expenseInitial }: ManagerExpenseFormType) {
  const router = useRouter();
  const { data: session } = useSession();
  const { getUser } = React.useContext(userContextData) as userContextDataType;

  const [isResponse, setIsResponse] = React.useState<boolean>(false);

  async function redirectChangeExpense() {
    await getUser(session?.user?.email);
    setIsResponse(false);

    router.push("/alterar-gasto");
  }

  async function createExpense(values: { name: string }) {
    async function requestCreate() {
      return await instances.post("api/expense", {
        ...values,
        userEmail: session?.user?.email,
      });
    }

    await customToast(requestCreate);
  }

  async function updateExpense(
    values: { name: string },
    expenseInitial: InitialExpenseUpdateType
  ) {
    async function requestUpdate() {
      return await instances.put("api/expense", {
        ...values,
        id: expenseInitial.id,
      });
    }

    await customToast(requestUpdate);
  }

  const onSubmitExpense = useFormik({
    initialValues: {
      name: expenseInitial?.name || "",
    },

    onSubmit: async (values) => {
      const isUpdate = !!expenseInitial?.name;

      if (isUpdate) {
        await updateExpense(values, expenseInitial);
      } else {
        await createExpense(values);
      }

      return await redirectChangeExpense();
    },

    validationSchema,
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
          value={onSubmitExpense.values.name}
          error={onSubmitExpense.errors.name}
        />
      </Sinputs>

      <Sbuttons>
        <Button
          text="Cadastrar"
          type="submit"
          disabled={isResponse}
          width="20rem"
        />
      </Sbuttons>
    </Scontainer>
  );
}

export default ManagerExpenseForm;
