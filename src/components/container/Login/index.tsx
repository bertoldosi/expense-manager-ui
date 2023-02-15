import React from "react";
import axios from "axios";
import Router from "next/router";

import { useGoogleLogin } from "@react-oauth/google";

import { Sconstainer } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";

const Login = () => {
  const { setUser } = React.useContext(UserContext) as UserContextType;

  const login = useGoogleLogin({
    onSuccess: async (response: any) => {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: "application/json",
          },
        }
      );

      setUser(data);
      Router.push("/alterar-gasto");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <Sconstainer>
      <button onClick={() => login()}>Entrar com o Google 🚀 </button>
    </Sconstainer>
  );
};

export default Login;
