import React from "react";
import { Button } from "../../../../common/Button";
import { Scontent } from "./styles";

type PropsType = {
  includeNewInstitution: React.MouseEventHandler<HTMLButtonElement>;
};

function Header({ includeNewInstitution }: PropsType) {
  return (
    <Scontent>
      <Button
        backgroundColor="#FFF"
        color="#333"
        onClick={includeNewInstitution}
      >
        Adicionar
      </Button>
      <Button backgroundColor="#333" color="#fff">
        Importar
      </Button>
    </Scontent>
  );
}

export default Header;
