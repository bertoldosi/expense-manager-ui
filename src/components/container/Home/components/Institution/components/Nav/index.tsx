import React from "react";

import { Scontent, Sitem, Slist } from "./styles";
import {
  UserContextConfig,
  UserContextConfigType,
} from "src/context/userContextConfig";
import { InstitutionType } from "@interfaces/*";

type PropsType = {
  institutions: InstitutionType[];
};

function Nav({ institutions }: PropsType) {
  const { selectedInstitution, toggleSelectedInstitution } = React.useContext(
    UserContextConfig
  ) as UserContextConfigType;

  if (institutions?.length === 0) {
    return (
      <Scontent>
        <h2>Cadastre um cartão!</h2>
      </Scontent>
    );
  }

  return (
    <Scontent>
      <Slist>
        {institutions?.map((institutionMap, index) =>
          institutionMap.name === selectedInstitution?.name ? (
            <Sitem
              key={index}
              className="selected"
              onClick={() => {
                toggleSelectedInstitution(institutionMap);
              }}
            >
              <h1>{institutionMap.name}</h1>
            </Sitem>
          ) : (
            <Sitem
              key={index}
              onClick={() => {
                toggleSelectedInstitution(institutionMap);
              }}
            >
              <h1>{institutionMap.name}</h1>
            </Sitem>
          )
        )}
      </Slist>
    </Scontent>
  );
}

export default Nav;
