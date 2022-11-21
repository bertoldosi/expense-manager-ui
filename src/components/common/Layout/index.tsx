import Header from "@commons/Header";
import React, { ReactNode } from "react";

import { Scontainer } from "./styles";

type PropsType = {
  children: ReactNode;
};

const Layout = ({ children }: PropsType) => {
  return (
    <Scontainer>
      <Header />
      {children}
    </Scontainer>
  );
};

export default Layout;
