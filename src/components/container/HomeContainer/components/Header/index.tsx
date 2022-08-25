import React from "react";
import { Scontent } from "./styles";

type PropsType = {
  handlerIncludeNewInstitution: React.MouseEventHandler<HTMLButtonElement>;
};

function Header({ handlerIncludeNewInstitution }: PropsType) {
  return (
    <Scontent>
      <button>Importar</button>
      <button onClick={handlerIncludeNewInstitution}>Adicionar</button>
    </Scontent>
  );
}

export default Header;
