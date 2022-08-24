import React from "react";
import { Sinput } from "./styles";

type PropsTypes = {
  value: string;
};

function InputTable({ value }: PropsTypes) {
  const [inputValue, setInputValue] = React.useState<string>(value);

  return (
    <Sinput
      value={inputValue}
      placeholder="Digite um valor"
      onChange={(e) => {
        setInputValue(e.target.value);
      }}
    />
  );
}

export default InputTable;
