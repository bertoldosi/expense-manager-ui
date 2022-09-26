import React, { ReactNode } from "react";

import { Sbutton, Scontent } from "./styles";

type PropsType = {
  children: ReactNode;
  icon?: any;
  color: string;
  background: string;
};

export const Button = ({ children, icon, color, background }: PropsType) => {
  return (
    <Scontent color={color} background={background}>
      {icon}
      <Sbutton>{children}</Sbutton>
    </Scontent>
  );
};
