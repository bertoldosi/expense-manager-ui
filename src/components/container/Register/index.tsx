import React from "react";

import { Slink } from "./styles";
import Input from "@commons/Input";
import { Button } from "@commons/Button";
import { LayoutAccess } from "@commons/LayoutAccess";

export const Register = () => {
  return (
    <LayoutAccess
      footer={
        <Button background="#fff" color="#333">
          Cadastrar
        </Button>
      }
    >
      <Input placeholder="Nome do usuário" />
      <Input placeholder="Email" />
      <Input placeholder="Senha" />
      <Input placeholder="Confirmar senha" />
      <Slink>
        Já tem cadastro ? <a href="/">Faça o login aqui</a>
      </Slink>
    </LayoutAccess>
  );
};
