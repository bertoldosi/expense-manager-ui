import React from "react";

import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { Table } from "@containers/Home/components/Shopping/components/Table";

import { Scontent, Sheader } from "./styles";

import { InstitutionType } from "@interfaces/";

type PropsType = {
  institution: InstitutionType;
};

export const Shopping = ({ institution }: PropsType) => {
  return (
    <Scontent>
      <Sheader>
        <Input
          autoComplete="off"
          autoFocus
          name="description"
          placeholder="Descrição do item"
        />
        <Input autoComplete="off" name="amount" placeholder="R$ 00,00" />
        <Input
          autoComplete="off"
          name="responsible"
          placeholder="Nome do responsavel"
        />
        <Button color="#fff" background="#1b66ff">
          Adicionar
        </Button>
      </Sheader>
      <Table institution={institution} />
    </Scontent>
  );
};
