import React, { ReactNode } from "react";

import { Scontent } from "./styles";

interface PropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  background?: string;
  width?: string;
  height?: string;
}

export const Button = ({
  children,
  color,
  background,
  width = "12rem",
  height = "4rem",
  ...props
}: PropsType) => {
  return (
    <Scontent
      color={color}
      background={background}
      width={width}
      height={height}
    >
      <button {...props}>{children}</button>
    </Scontent>
  );
};
