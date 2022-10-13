import React, { ReactNode } from "react";

import { Sbutton, Scontent } from "./styles";

type PropsType = {
  children: ReactNode;
  icon?: any;
  color: string;
  background: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  ContainerInputClassName?: string;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  children,
  icon,
  color,
  background,
  disabled,
  onClick,
  ContainerInputClassName,
  type,
}: PropsType) => {
  return (
    <Scontent
      className={ContainerInputClassName}
      color={color}
      background={background}
      onClick={onClick}
    >
      {icon}
      <Sbutton type={type} disabled={disabled}>
        {children}
      </Sbutton>
    </Scontent>
  );
};
