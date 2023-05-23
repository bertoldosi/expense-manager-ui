import React from "react";
import axios from "axios";
import Router from "next/router";

import { useGoogleLogin } from "@react-oauth/google";

import { Sconstainer } from "./styles";
import { userContextDataType } from "src/context/userContextData";
import { userContextData } from "src/context/userContextData";
import { createPerson, getPerson } from "@api/person";

const Login = () => {
  const { setUser } = React.useContext(userContextData) as userContextDataType;

  const login = useGoogleLogin({
    onSuccess: async (response: any) => {
      const { data: responseData } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: "application/json",
          },
        }
      );

      setUser(responseData);

      const { data: responsePerson } = await getPerson(responseData.email);

      if (responsePerson?.name) {
        Router.push("/alterar-gasto");
      } else {
        await createPerson(responseData);
        Router.push("/alterar-gasto");
      }
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
