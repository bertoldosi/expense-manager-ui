import React, { useContext } from "react";
import Cookies from "universal-cookie";
import { useFormik } from "formik";

import Input from "@commons/Input";
import { Button } from "@commons/Button";
import ShoppingTable from "@containers/Home/ShoppingTable";

import { Scontent, Sheader } from "./styles";
import validationSchema from "@containers/Home/Shopping/validations";
import instances from "@lib/axios-instance-internal";
import { userContextData, userContextDataType } from "@context/userContextData";
import { customToast } from "@commons/CustomToast";
import { formatedInputValue } from "@helpers/formatedInputValue";
import { focusInput } from "@helpers/focusInput";

const INITIAL_SHOPPING = {
  description: "",
  amount: "",
  responsible: "",
  paymentStatus: "aberto",
};

function Shopping() {
  const cookies = new Cookies();

  const { getInstitution } = useContext(userContextData) as userContextDataType;

  const onSubmitShopping = useFormik({
    initialValues: INITIAL_SHOPPING,
    onSubmit: async (values) => {
      const { filter = {} } = cookies.get("expense-manager");

      const shopping = {
        ...values,
        responsible: values.responsible ? values.responsible : "sem",
      };

      instances
        .post("api/shopping", {
          shopping: {
            ...shopping,
            amount: shopping.amount.replace(/,/g, ""),
          },
          institutionId: filter.institution.id,
        })
        .then(() => {
          focusInput("description");
          getInstitution(filter.institution.id);
          customToast(
            "success",
            `${shopping.description} incluído com sucesso!`
          );
        });

      onSubmitShopping.resetForm();
    },

    validationSchema,
  });

  return (
    <Scontent>
      <Sheader onSubmit={onSubmitShopping.handleSubmit}>
        <Input
          name="description"
          id="description"
          autoFocus
          autoComplete="off"
          placeholder="Descrição do item"
          value={onSubmitShopping.values.description}
          onChange={onSubmitShopping.handleChange}
          error={onSubmitShopping.errors.description}
        />
        <Input
          name="amount"
          id="amount"
          autoComplete="off"
          placeholder="R$ 00,00"
          value={formatedInputValue(onSubmitShopping.values.amount, "amount")}
          onChange={onSubmitShopping.handleChange}
          error={onSubmitShopping.errors.amount}
        />
        <Input
          name="responsible"
          id="responsible"
          autoComplete="off"
          value={onSubmitShopping.values.responsible}
          onChange={onSubmitShopping.handleChange}
          placeholder="Nome do responsavel"
          error={onSubmitShopping.errors.responsible}
        />
        <Button text="Adicionar" type="submit" />
      </Sheader>

      <ShoppingTable />
    </Scontent>
  );
}

export default Shopping;
