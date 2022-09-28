import React, { ReactNode } from "react";

import { Sbutton, Scontent } from "./styles";

type PropsType = {
  children: ReactNode;
  icon?: any;
  color: string;
  background: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
    <Scontent color={color} background={background} onClick={onClick}>
      {icon}
      <Sbutton disabled={disabled}>{children}</Sbutton>
    </Scontent>
  );
};
