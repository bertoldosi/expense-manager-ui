import React from "react";
import Image from "next/image";
import logoDark from "@assets/logo-dark.svg";

import { Sbody, Scontainer, Scontent, Sfooter, Sheader, Slink } from "./styles";
import Input from "@commons/Input";
import { Button } from "@commons/Button";

export const Login = () => {
  return (
    <Scontainer>
      <Scontent>
        <Sheader>
          <Image src={logoDark} width={150} />
        </Sheader>

        <Sbody>
          <Input placeholder="Nome" />
          <Input placeholder="Senha" />
          <Slink>
            Novo em nossa plataforma ?{" "}
            <a href="/cadastro">Crie sua conta aqui</a>
          </Slink>
        </Sbody>

        <Sfooter>
          <Button background="#fff" color="#333">
            Entrar
          </Button>
        </Sfooter>
      </Scontent>
    </Scontainer>
  );
};
