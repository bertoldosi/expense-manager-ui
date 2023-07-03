import React from "react";
import Cookies from "universal-cookie";
import { useFormik } from "formik";

import { Button } from "@commons/Button";
import { ShoppingType } from "@interfaces/";
import ShoppingTable from "@containers/Home/ShoppingTable";
import Input from "@commons/Input";

import { Scontent, Sheader } from "./styles";

const initialValues = {
  description: "",
  amount: "",
  responsible: "",
};

export const Shopping = () => {
  const cookies = new Cookies();

  const [isResponse, setIsResponse] = React.useState<boolean>(false);

  function addShopping(shopping: ShoppingType) {}

  const onSubmitShopping = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setIsResponse(true);
      const cookieValues = cookies.get("expense-manager");

      setIsResponse(false);
      onSubmitShopping.resetForm();
    },
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
        />
        <Input
          name="amount"
          id="amount"
          autoComplete="off"
          placeholder="R$ 00,00"
          disabled={isResponse}
          value={onSubmitShopping.values.amount}
          onChange={onSubmitShopping.handleChange}
        />
        <Input
          name="responsible"
          id="responsible"
          autoComplete="off"
          value={onSubmitShopping.values.responsible}
          onChange={onSubmitShopping.handleChange}
          placeholder="Nome do responsavel"
        />
        <Button text="Adicionar" type="submit" disabled={isResponse} />
      </Sheader>

      <ShoppingTable />
    </Scontent>
  );
};
