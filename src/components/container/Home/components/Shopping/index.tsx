import React from "react";

import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { Table } from "@containers/Home/components/Shopping/components/Table";

import { Scontent, Sheader } from "./styles";
import { InstitutionType } from "@interfaces/";
import { useFormik } from "formik";

type PropsType = {
  institution: InstitutionType;
};

export const Shopping = ({ institution }: PropsType) => {
  const onSubmitShopping = useFormik({
    initialValues: {
      description: "",
      amount: "",
      responsible: "",
    },
    onSubmit: async (values) => {
      console.log(institution, values);
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
          onChange={onSubmitShopping.handleChange}
        />
        <Input
          name="amount"
          id="amount"
          autoComplete="off"
          placeholder="R$ 00,00"
          onChange={onSubmitShopping.handleChange}
        />
        <Input
          name="responsible"
          id="responsible"
          autoComplete="off"
          onChange={onSubmitShopping.handleChange}
          placeholder="Nome do responsavel"
        />
        <Button color="#fff" background="#1b66ff" type="submit">
          Adicionar
        </Button>
      </Sheader>
      <Table institution={institution} />
    </Scontent>
  );
};
