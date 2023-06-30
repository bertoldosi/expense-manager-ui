import React from "react";

import { ScontainerInput, ScontainerInputCheckbox } from "./styles";

interface PropsTypes extends React.HTMLProps<HTMLInputElement> {
  handleEnter?: any;
  props?: React.ChangeEventHandler<HTMLInputElement>;
}

function InputTable({ handleEnter, ...props }: PropsTypes) {
  const { name, type } = props;

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode == 13) {
      handleEnter();
    }
  };

  const isAmount = name === "amount";

  const placeholder = isAmount ? "R$ 0,00" : "Digite um valor";

  return type === "checkbox" ? (
    <ScontainerInputCheckbox>
      <input {...props} />
    </ScontainerInputCheckbox>
  ) : (
    <ScontainerInput>
      <input
        placeholder={placeholder}
        onKeyUp={handleEnter && handleOnKeyUp}
        {...props}
      />
    </ScontainerInput>
  );
}

export default InputTable;
