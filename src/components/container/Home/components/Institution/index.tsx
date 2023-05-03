import React from "react";

import { InstitutionType } from "@interfaces/";

import { Button } from "@commons/Button";
import { CardMenu } from "@containers/Home/components/Institution/components/CardMenu";
import { Shopping } from "@containers/Home/components/Shopping";
import { Saside, Ssection, Swrapper } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";
import Nav from "./components/Nav";

type PropsType = {
  institutions: InstitutionType[];
};

export const Institution = ({ institutions }: PropsType) => {
  const { listResponsibleTotalMonth, nowCard, theme } = React.useContext(
    UserContext
  ) as UserContextType;

  if (institutions.length === 0) {
    return (
      <div>
        <nav>
          <Nav institutions={[]} />
        </nav>

        <Ssection>
          <Saside>
            <CardMenu
              title={"SEM CARTÃO"}
              list={[]}
              background={theme.backgroundPrimary}
              isFooter={
                <>
                  <Button color="#fff" background="#1b66ff" width="100%">
                    Novo cartão
                  </Button>
                </>
              }
            />
          </Saside>
        </Ssection>
      </div>
    );
  }

  return (
    <>
      <Swrapper>
        <nav>
          <Nav institutions={institutions} />
        </nav>

        {institutions?.map((institutionMap, index) => {
          if (institutionMap.name === nowCard) {
            return (
              <div key={index}>
                <Ssection>
                  <Saside>
                    <CardMenu
                      title={`TOTAL ${institutionMap.name.toUpperCase()}`}
                      list={institutionMap.listResponsibleValues}
                      background={theme.backgroundPrimary}
                      isFooter={
                        <>
                          <Button
                            color="#fff"
                            background="#1b66ff"
                            width="100%"
                          >
                            Novo cartão
                          </Button>
                        </>
                      }
                    />
                    <CardMenu
                      title="TOTAL MENSAL"
                      list={listResponsibleTotalMonth}
                      background={theme.backgroundPrimary}
                    />
                  </Saside>
                  <Shopping institution={institutionMap} />
                </Ssection>
              </div>
            );
          }
        })}
      </Swrapper>
    </>
  );
};
