import React, { ReactNode } from "react";

import { Scontent } from "./styles";

type PropsType = {
  children: ReactNode;
  color?: string;
  background?: string;
  props?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Button = ({
  children,
  color,
  background,
  ...props
}: PropsType) => {
  return (
    <Scontent color={color} background={background}>
      <button {...props}>{children}</button>
    </Scontent>
  );
};
