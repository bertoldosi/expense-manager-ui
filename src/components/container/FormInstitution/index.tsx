import React from "react";
import { useFormik } from "formik";
import Cookies from "universal-cookie";

import instances from "@lib/axios-instance-internal";
import validationSchema from "./validations";
import { Button } from "@commons/Button";
import Input from "@commons/Input";

import { Sform } from "./styles";

const INITIAL_INSTITUTION = {
  name: "",
};

function FormInstitution() {
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

export default FormInstitution;
