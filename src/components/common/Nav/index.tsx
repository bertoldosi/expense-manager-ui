import React from "react";
import {
  InstitutionType,
  MonthType,
} from "../../containers/HomeContainer/types";
import { Scontent, Sitem, Slist } from "./styles";

type PropsType = {
  institutions: InstitutionType[];
  setInstitutionVisible: Function;
  institutionVisible: number;
};

function Nav({
  institutions,
  setInstitutionVisible,
  institutionVisible,
}: PropsType) {
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
          index === institutionVisible ? (
            <Sitem
              className="selected"
              onClick={() => {
                setInstitutionVisible(index);
              }}
            >
              <h1>{institutionMap.name}</h1>
            </Sitem>
          ) : (
            <Sitem
              onClick={() => {
                setInstitutionVisible(index);
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
