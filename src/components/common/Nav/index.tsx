import React from "react";
import { InstitutionType } from "../../containers/HomeContainer/types";
import { Scontent, Sitem, Slist } from "./styles";

type PropsType = {
  institutions: InstitutionType[];
};

function Nav({ institutions }: PropsType) {
  if (institutions.length === 0) {
    return (
      <Scontent>
        <h2>Cadastre um cartão!</h2>
      </Scontent>
    );
  }

  return (
    <Scontent>
      <Slist>
        {institutions.map((institutionMap) => (
          <Sitem>
            <h1>{institutionMap.name}</h1>
          </Sitem>
        ))}
      </Slist>
    </Scontent>
  );
}

export default Nav;
