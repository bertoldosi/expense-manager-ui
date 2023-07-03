import React, { useContext } from "react";
import { useFormik } from "formik";
import Cookies from "universal-cookie";

import instances from "@lib/axios-instance-internal";
import validationSchema from "./validations";

import { Button } from "@commons/Button";
import Input from "@commons/Input";

import { Sform } from "./styles";
import { userContextData, userContextDataType } from "@context/userContextData";

const INITIAL_INSTITUTION = {
  name: "",
};

interface InstitutionFormProps {
  exitModal?: Function;
}

function InstitutionForm({ exitModal }: InstitutionFormProps) {
  const cookies = new Cookies();

  const { toggleSelectedInstitution, getExpense } = useContext(
    userContextData
  ) as userContextDataType;

  const onSubmitInstitution = useFormik({
    initialValues: INITIAL_INSTITUTION,
    onSubmit: async (values) => {
      const { filter } = cookies.get("expense-manager");

      instances
        .post("api/institution", {
          name: values.name,
          expenseId: filter.expense.id,
        })
        .then(async (response) => {
          await getExpense(filter.expense.id);
          toggleSelectedInstitution(response.data);
        });

      onSubmitInstitution.resetForm();

      if (exitModal) {
        exitModal();
      }
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

export default InstitutionForm;
