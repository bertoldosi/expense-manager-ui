import React from "react";

import { Scontainer } from "./styles";

interface PropsTypes extends React.HTMLProps<HTMLInputElement> {
  error?: string;
  props?: React.ChangeEventHandler<HTMLInputElement>;
}

function Input({ error, ...props }: PropsTypes) {
  return (
    <Scontainer>
      <input {...props} />
      <span>{error}</span>
    </Scontainer>
  );
}

export default Input;
