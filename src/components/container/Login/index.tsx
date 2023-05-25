import React, { useContext } from "react";
import Cookies from "universal-cookie";
import Router from "next/router";
import axios from "axios";

import { useGoogleLogin } from "@react-oauth/google";

import { Sconstainer } from "./styles";
import { userContextDataType } from "src/context/userContextData";
import { userContextData } from "src/context/userContextData";
import { createPerson, getPerson } from "@api/person";

const URL_GOOGLE_APIS =
  "https://www.googleapis.com/oauth2/v1/userinfo?access_token=";

const Login = () => {
  const cookies = new Cookies();

  const { setPerson } = useContext(userContextData) as userContextDataType;

  const login = useGoogleLogin({
    onSuccess: async (response: any) => {
      const { data: responseUser } = await axios.get(
        `${URL_GOOGLE_APIS}${response.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: "application/json",
          },
        }
      );

      cookies.set("expense-manager", { user: responseUser });
      const { data: responsePerson } = await getPerson(responseUser.email);

      if (responsePerson?.name) {
        setPerson(responsePerson);
        Router.push("/alterar-gasto");
      } else {
        createPerson(responseUser).then((response) => {
          setPerson(response.data);
        });

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
