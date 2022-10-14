import React from "react";
import { focusInput } from "@helpers/focusInput";

import { Scontainer, Sinput } from "./styles";

interface PropsTypes extends React.HTMLProps<HTMLInputElement> {
  error?: Object;
}

function Input({ error, ...props }: PropsTypes) {
  return (
    <Scontainer>
      <Sinput {...props} />
      {error}
    </Scontainer>
  );
}

export default Input;
