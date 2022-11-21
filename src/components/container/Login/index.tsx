import React from "react";

import { Slink } from "./styles";
import Input from "@commons/Input";
import { Button } from "@commons/Button";
import { LayoutAccess } from "@commons/LayoutAccess";

export const Login = () => {
  return (
    <LayoutAccess
      footer={
        <Button background="#fff" color="#333">
          Entrar
        </Button>
      }
    >
      <Input placeholder="Nome" />
      <Input placeholder="Senha" />
      <Slink>
        Novo em nossa plataforma ? <a href="/cadastro">Crie sua conta aqui</a>
      </Slink>
    </LayoutAccess>
  );
};
