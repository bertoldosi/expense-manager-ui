import React, { ReactNode } from "react";

import { Sbutton, Scontent } from "./styles";

type PropsType = {
  children: ReactNode;
  icon?: any;
  color: string;
  background: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Button = ({
  children,
  icon,
  color,
  background,
  onClick,
}: PropsType) => {
  return (
    <Scontent color={color} background={background} onClick={onClick}>
      {icon}
      <Sbutton>{children}</Sbutton>
    </Scontent>
  );
};
