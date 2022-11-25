import React from "react";

import { Sfooter, Sinputs, Slink } from "./styles";
import Input from "@commons/Input";
import { Button } from "@commons/Button";

const Login = () => {
  return (
    <>
      <Sinputs>
        <Input placeholder="Nome" />
        <Input placeholder="Senha" />
      </Sinputs>
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
