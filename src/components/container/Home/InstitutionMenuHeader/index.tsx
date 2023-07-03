import React from "react";

import { Scontent, Sitem, Slist } from "./styles";
import { InstitutionType } from "@interfaces/*";
import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

type PropsType = {
  institutions?: InstitutionType[];
};

function InstitutionMenuHeader({ institutions = [] }: PropsType) {
  const { selectedInstitution, toggleSelectedInstitution } = React.useContext(
    userContextData
  ) as userContextDataType;

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

export default InstitutionMenuHeader;
