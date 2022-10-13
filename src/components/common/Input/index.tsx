import React from "react";
import { focusInput } from "@helpers/focusInput";

import { Sinput } from "./styles";

type PropsTypes = {
  onKeyUp?: any;
  error?: Object;
  props: any;
};

function Input({ error, onKeyUp, ...props }: PropsTypes) {
  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == 13) {
      onKeyUp();
      focusInput("description");
    }
  };

  return (
    <>
      <Sinput onKeyUp={onKeyUp && handleOnKeyUp} {...props} />
      {error}
    </>
  );
}

export default Input;
