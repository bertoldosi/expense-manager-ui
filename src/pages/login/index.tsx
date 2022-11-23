import { LayoutAccess } from "@commons/LayoutAccess";
import LoginContainer from "@containers/Login";
import React from "react";

const login = () => {
  return <LoginContainer />;
};

login.layout = LayoutAccess;

export default login;
