import React, { ReactNode } from "react";

import { Sbutton, Scontent } from "./styles";

type PropsType = {
  children: ReactNode;
  icon?: any;
  color: string;
  background: string;
  onClick?: any;
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
    <>
      {disabled ? (
        <Scontent
          className={ContainerInputClassName}
          color={color}
          background={background}
          aria-disabled={disabled}
        >
          <span>Processando...</span>
        </Scontent>
      ) : (
        <Scontent
          className={ContainerInputClassName}
          color={color}
          background={background}
          aria-disabled={disabled}
          onClick={onClick}
        >
          {icon}
          <Sbutton type={type} disabled={disabled}>
            {children}
          </Sbutton>
        </Scontent>
      )}
    </>
  );
};
