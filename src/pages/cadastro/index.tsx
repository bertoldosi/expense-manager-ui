import React from "react";
import { LayoutAccess } from "@commons/LayoutAccess";
import { Register } from "@containers/Register";

const cadastro = () => {
  return <Register />;
};

cadastro.layout = LayoutAccess;

export default cadastro;
