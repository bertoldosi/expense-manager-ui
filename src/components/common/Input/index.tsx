import React from "react";
import { focusInput } from "@helpers/focusInput";

import { Sinput } from "./styles";

interface PropsTypes extends React.HTMLProps<HTMLInputElement> {
  error?: Object;
}

function Input({ error, ...props }: PropsTypes) {
  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == 13) {
      focusInput("description");
    }
  };

  return (
    <>
      <input onKeyUp={handleOnKeyUp} {...props} />
      {error}
    </>
  );
}

export default Input;
