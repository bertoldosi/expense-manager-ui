import React from "react";
import { signIn } from "next-auth/react";

import { Scontainer } from "./styles";

const Login = () => {
  return (
    <Scontainer>
      <button onClick={() => signIn("google")}>Entrar com o Google 🚀 </button>
    </Scontainer>
  );
};

export default Login;
