import { LayoutAccess } from "@commons/LayoutAccess";
import Login from "@containers/Login";
import React from "react";

const login = () => {
  return <Login />;
};

login.layout = LayoutAccess;

export default login;
