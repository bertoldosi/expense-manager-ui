import React from "react";
import { focusInput } from "@helpers/focusInput";

import { Sinput } from "./styles";

type PropsTypes = {
  name: string;
  id: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: any;
  disabled?: boolean;
  type?: string;
  autofocus?: boolean;
  tabIndex?: number | undefined;
  checked?: boolean;
  placeholder?: string;
  required?: boolean;
  error?: Object;
};

function Input({
  name,
  id,
  value,
  onChange,
  disabled,
  onKeyUp,
  type,
  autofocus,
  tabIndex,
  checked,
  placeholder = "Digite um valor",
  required,
  error,
}: PropsTypes) {
  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == 13) {
      onKeyUp();
      focusInput("description");
    }
  };

  return (
    <>
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
        checked={checked}
        required={required}
      />
      {error}
    </>
  );
}

export default Input;
