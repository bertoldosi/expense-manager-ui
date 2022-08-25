import React from "react";
import { Button } from "../../../../common/Button";
import { Scontent } from "./styles";

type PropsType = {
  handlerIncludeNewInstitution: React.MouseEventHandler<HTMLButtonElement>;
};

function Header({ handlerIncludeNewInstitution }: PropsType) {
  return (
    <Scontent>
      <Button
        backgroundColor="#FFF"
        color="#333"
        onClick={handlerIncludeNewInstitution}
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
