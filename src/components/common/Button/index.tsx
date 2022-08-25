import React, { ReactNode } from "react";

import { Sbutton } from "./styles";

type PropsType = {
  children: string | ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  backgroundColor: string;
  color?: string;
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  backgroundColor,
  color = "#fff",
  disabled,
}: PropsType) => {
  return (
    <Sbutton
      disabled={disabled}
      backgroundColor={backgroundColor}
      color={color}
      onClick={onClick}
    >
      {children}
    </Sbutton>
  );
};
