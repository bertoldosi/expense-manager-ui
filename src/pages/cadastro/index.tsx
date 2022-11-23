import React from "react";
import { LayoutAccess } from "@commons/LayoutAccess";
import RegisterContainer from "@containers/Register";

const cadastro = () => {
  return <RegisterContainer />;
};

cadastro.layout = LayoutAccess;

export default cadastro;
