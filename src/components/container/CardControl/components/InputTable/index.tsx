import React from "react";
import { Sinput } from "./styles";

type PropsTypes = {
  name: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function InputTable({ name, id, value, onChange }: PropsTypes) {
  return (
    <Sinput
      name={name}
      id={id}
      value={value}
      placeholder="Digite um valor"
      onChange={onChange}
    />
  );
}

export default InputTable;
