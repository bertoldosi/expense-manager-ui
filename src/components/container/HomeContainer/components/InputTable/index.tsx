import React from "react";
import { Sinput } from "./styles";

type PropsTypes = {
  name: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

function InputTable({ name, id, value, onChange, disabled }: PropsTypes) {
  return (
    <Sinput
      name={name}
      id={id}
      value={value}
      placeholder="Digite um valor"
      onChange={onChange}
      disabled={disabled}
    />
  );
}

export default InputTable;
