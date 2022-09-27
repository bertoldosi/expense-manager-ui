import React, { ReactNode } from "react";

import { Sbutton, Scontent } from "./styles";

type PropsType = {
  children: ReactNode;
  icon?: any;
  color: string;
  background: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export const Button = ({
  children,
  icon,
  color,
  background,
  disabled,
  onClick,
}: PropsType) => {
  return (
    <Scontent color={color} background={background}>
      {icon}
      <Sbutton disabled={disabled} onClick={onClick}>
        {children}
      </Sbutton>
    </Scontent>
  );
};
