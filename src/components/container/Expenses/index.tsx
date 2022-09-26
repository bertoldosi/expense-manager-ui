import React from "react";
import { Button } from "../../common/Button";
import Input from "../../common/Input";
import { Add } from "../../icons/Add";

import { Scontent, Sheader, Stable } from "./styles";

export const Expenses = () => {
  return (
    <Scontent>
      <Sheader>
        <Input name="teste" value="" id="2" />
        <Input name="teste" value="" id="2" />
        <Input name="teste" value="" id="2" />
        <Button
          color="#fff"
          background="#B0C4DE"
          icon={<Add width={15} height={15} />}
        >
          Novo cartão
        </Button>
      </Sheader>
      <Stable>Expenses</Stable>
    </Scontent>
  );
};
