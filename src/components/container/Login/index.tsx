import React from "react";
import { signIn } from "next-auth/react";

import { Sconstainer } from "./styles";

const Login = () => {
  return (
    <Sconstainer>
      <button onClick={() => signIn("google")}>Entrar com o Google 🚀 </button>
    </Sconstainer>
  );
};

export default Login;
