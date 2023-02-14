import React from "react";

// import { Sfooter, Sinputs, Slink } from "./styles";
// import Input from "@commons/Input";
// import { Button } from "@commons/Button";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  return (
    <>
      {/* <Sinputs>
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
      </Sfooter> */}

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default Login;
