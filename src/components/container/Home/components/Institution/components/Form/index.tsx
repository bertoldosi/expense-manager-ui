import React from "react";
import { useFormik } from "formik";

import { Sform } from "./styles";

import Input from "@commons/Input";
import { Button } from "@commons/Button";
import validationSchema from "./validations";
import instances from "src/lib/axios-instance-internal";
import Cookies from "universal-cookie";

const INITIAL_INSTITUTION = {
  name: "",
};

function Form() {
  const cookies = new Cookies();

  const onSubmitInstitution = useFormik({
    initialValues: INITIAL_INSTITUTION,
    onSubmit: async (values) => {
      const { filter } = cookies.get("expense-manager");

      await instances.post("api/institution", {
        name: values.name,
        expenseId: filter.expense.id,
      });

      onSubmitInstitution.resetForm();
    },

    validationSchema,
  });

  return (
    <Sform onSubmit={onSubmitInstitution.handleSubmit}>
      <Input
        name="name"
        onChange={onSubmitInstitution.handleChange}
        value={onSubmitInstitution.values.name}
        placeholder="Nome do cartão"
        autoFocus
        error={onSubmitInstitution.errors.name}
      />

      <Button text="Salvar" type="submit" width="20rem" />
    </Sform>
  );
}

export default Form;
