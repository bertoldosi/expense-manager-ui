import React from "react";

import { Scontent, Sitem, Slist } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";
import { InstitutionType } from "@interfaces/*";

type PropsType = {
  institutions: InstitutionType[];
};

function Nav({ institutions }: PropsType) {
  const { nowCard, handlerNumberCard } = React.useContext(
    UserContext
  ) as UserContextType;

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
        {institutions.map((institutionMap, index) =>
          index === nowCard ? (
            <Sitem
              key={index}
              className="selected"
              onClick={() => {
                handlerNumberCard(index);
              }}
            >
              <h1>{institutionMap.name}</h1>
            </Sitem>
          ) : (
            <Sitem
              key={index}
              onClick={() => {
                handlerNumberCard(index);
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
