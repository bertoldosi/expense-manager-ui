import React from "react";

import { Scontainer, Sinput } from "./styles";

interface PropsTypes extends React.HTMLProps<HTMLInputElement> {
  error?: Object;
  props?: React.ChangeEventHandler<HTMLInputElement>;
}

function Input({ error, props }: PropsTypes) {
  return (
    <Scontainer>
      <>
        <Sinput {...props} />
        {error}
      </>
    </Scontainer>
  );
}

export default Input;
