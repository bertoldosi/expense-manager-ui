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

  const { setUser, setPerson } = useContext(
    userContextData
  ) as userContextDataType;

  const login = useGoogleLogin({
    onSuccess: async (response: any) => {
      const { data: responseData } = await axios.get(
        `${URL_GOOGLE_APIS}${response.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: "application/json",
          },
        }
      );

      setUser(responseData);
      cookies.set("expense-manager", { user: responseData });
      const { data: responsePerson } = await getPerson(responseData.email);

      if (responsePerson?.name) {
        setPerson(responsePerson);
        Router.push("/alterar-gasto");
      } else {
        createPerson(responseData).then((response) => {
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
