import { LayoutAccess } from "@commons/LayoutAccess";
import LoginContainer from "@containers/Login";
import React from "react";

const Login = () => {
  return <LoginContainer />;
};

Login.layout = LayoutAccess;

export default Login;
