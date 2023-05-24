import React from "react";

import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { Table } from "@containers/Home/components/Shopping/components/Table";

import { Scontent, Sheader } from "./styles";
import { InstitutionType } from "@interfaces/";
import { useFormik } from "formik";
import { createShopping } from "@api/shopping";
import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

type PropsType = {
  institution: InstitutionType;
};

const initialValues = {
  description: "",
  amount: "",
  responsible: "",
};

export const Shopping = ({ institution }: PropsType) => {
  const {} = React.useContext(userContextData) as userContextDataType;

  const [isResponse, setIsResponse] = React.useState<boolean>(false);

  const onSubmitShopping = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      setIsResponse(true);

      createShopping(institution.id, values).finally(() => {
        setIsResponse(false);
      });

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
          onChange={onSubmitShopping.handleChange}
        />
        <Input
          name="amount"
          id="amount"
          autoComplete="off"
          placeholder="R$ 00,00"
          disabled={isResponse}
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
