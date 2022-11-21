import React from "react";

import { Sfooter, Slink } from "./styles";
import Input from "@commons/Input";
import { Button } from "@commons/Button";

export const Register = () => {
  return (
    <>
      <Input placeholder="Nome do usuário" />
      <Input placeholder="Email" />
      <Input placeholder="Senha" />
      <Input placeholder="Confirmar senha" />
      <Slink>
        Já tem cadastro ? <a href="/">Faça o login aqui</a>
      </Slink>

      <Sfooter>
        <Button background="#fff" color="#333">
          Cadastrar
        </Button>
      </Sfooter>
    </>
  );
};
