import React from "react";

import { Sfooter, Slink } from "./styles";
import Input from "@commons/Input";
import { Button } from "@commons/Button";

const Login = () => {
  return (
    <>
      <Input placeholder="Nome" />
      <Input placeholder="Senha" />
      <Slink>
        Novo em nossa plataforma ? <a href="/cadastro">Crie sua conta aqui</a>
      </Slink>

      <Sfooter>
        <Button background="#fff" color="#333">
          Entrar
        </Button>
      </Sfooter>
    </>
  );
};

export default Login;
