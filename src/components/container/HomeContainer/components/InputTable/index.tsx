import React from "react";
import { focusInput } from "../../../../../helpers/focusInput";
import { Sinput } from "./styles";

type PropsTypes = {
  name: string;
  id: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: any;
  disabled?: boolean;
  type?: string;
  autofocus?: boolean;
  tabIndex?: number | undefined;
};

function InputTable({
  name,
  id,
  value,
  onChange,
  disabled,
  onKeyUp,
  type,
  autofocus,
  tabIndex,
}: PropsTypes) {
  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == 13) {
      onKeyUp();
      focusInput();
    }
  };

  const isAmount = name === "amount";

  const placeholder = isAmount ? "R$ 0,00" : "Digite um valor";

  return (
    <Sinput
      autoComplete="off"
      tabIndex={tabIndex}
      autoFocus={autofocus}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onKeyUp && handleOnKeyUp}
      disabled={disabled}
      type={type}
    />
  );
}

export default InputTable;
