import React from "react";
import { ScontainerInput, ScontainerInputCheckbox } from "./styles";

interface PropsTypes extends React.HTMLProps<HTMLInputElement> {
  handleEnter?: any;
  props?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputTable: React.FC<PropsTypes> = ({ handleEnter, ...props }) => {
  const { name, type, id } = props;

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keycode = event.keyCode ? event.keyCode : event.which;

    if (keycode === 13 && handleEnter) {
      handleEnter();
    }
  };

  const isAmount = name === "amount";
  const placeholder = isAmount ? "R$ 0,00" : "Digite um valor";

  if (type === "checkbox") {
    return (
      <ScontainerInputCheckbox>
        <input id={id} type="checkbox" {...props} />
        <label htmlFor={id} />
      </ScontainerInputCheckbox>
    );
  }

  return (
    <ScontainerInput>
      <input
        id={id}
        placeholder={placeholder}
        onKeyUp={handleOnKeyUp}
        {...props}
      />
    </ScontainerInput>
  );
};

export default InputTable;
