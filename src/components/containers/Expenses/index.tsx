import React from "react";
import { Button } from "../../common/Button";
import Input from "../../common/Input";
import { Add } from "../../icons/Add";
import { Table } from "../../common/Table";

import { Scontent, Sheader } from "./styles";
import { InstitutionType } from "../HomeContainer/types";

type PropsType = {
  institution: InstitutionType;
};

export const Expenses = ({ institution }: PropsType) => {
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
          Novo compra
        </Button>
      </Sheader>
      <Table institution={institution} />
    </Scontent>
  );
};
