import React, { useContext } from "react";

import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { Table } from "@containers/Home/components/Shopping/components/Table";

import { Scontent, Sheader } from "./styles";
import { CookiesType, ShoppingType } from "@interfaces/";
import { useFormik } from "formik";
import { createShopping } from "@api/shopping";
import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";
import Cookies from "universal-cookie";

const initialValues = {
  description: "",
  amount: "",
  responsible: "",
};

export const Shopping = () => {
  const cookies = new Cookies();
  const { institution, setInstitution } = useContext(
    userContextData
  ) as userContextDataType;

  const [isResponse, setIsResponse] = React.useState<boolean>(false);

  function addShopping(shopping: ShoppingType) {
    const shoppings = [...(institution?.shoppings || [])];
    shoppings.splice(0, 0, shopping);

    const newInstitution = {
      ...institution,
      shoppings: shoppings,
    };

    setInstitution(newInstitution);
  }

  const onSubmitShopping = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setIsResponse(true);
      const cookieValues = cookies.get<CookiesType>("expense-manager");

      await createShopping(cookieValues?.filter?.institution?.id, values);
      addShopping(values);

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
        <Button
          color="#fff"
          background="#1b66ff"
          type="submit"
          disabled={isResponse}
        >
          Adicionar
        </Button>
      </Sheader>
      <Table />
    </Scontent>
  );
};
