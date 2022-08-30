import React from "react";
import { Sinput } from "./styles";

type PropsTypes = {
  name: string;
  id: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: any;
  disabled?: boolean;
};

function InputTable({
  name,
  id,
  value,
  onChange,
  disabled,
  onKeyUp,
}: PropsTypes) {
  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == 13) {
      onKeyUp();
    }
  };

  return (
    <Sinput
      name={name}
      id={id}
      value={value}
      placeholder="Digite um valor"
      onChange={onChange}
      onKeyUp={handleOnKeyUp}
      disabled={disabled}
    />
  );
}

export default InputTable;
