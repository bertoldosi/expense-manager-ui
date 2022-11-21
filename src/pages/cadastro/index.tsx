import { LayoutAccess } from "@commons/LayoutAccess";
import { Register } from "@containers/Register";
import React from "react";

const cadastro = () => {
  return <Register />;
};

cadastro.layout = LayoutAccess;

export default cadastro;
