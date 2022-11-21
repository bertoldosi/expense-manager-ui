import React, { ReactNode } from "react";

import { Scontainer } from "./styles";

type PropsType = {
  children: ReactNode;
};

const Layout = ({ children }: PropsType) => {
  return (
    <Scontainer>
      <h1>Header</h1>
      {children}
    </Scontainer>
  );
};

export default Layout;
