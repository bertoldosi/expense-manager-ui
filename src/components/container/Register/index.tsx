import React from "react";

import { Sfooter, Sinputs, Slink } from "./styles";
import Input from "@commons/Input";
import { Button } from "@commons/Button";

const Register = () => {
  return (
    <>
      <Sinputs>
        <Input placeholder="Nome do usuário" />
        <Input placeholder="Email" />
        <Input placeholder="Senha" />
        <Input placeholder="Confirmar senha" />
      </Sinputs>

      <Slink>
        Já tem cadastro ? <a href="/login">Faça o login aqui</a>
      </Slink>

      <Sfooter>
        <Button background="#fff" color="#333">
          Cadastrar
        </Button>
      </Sfooter>
    </>
  );
};

export default Register;
