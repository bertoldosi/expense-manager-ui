import Header from "@containers/Layout/Header";
import React, { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

const Layout = ({ children }: PropsType) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
