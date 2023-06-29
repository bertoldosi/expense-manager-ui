import React, { useContext, useState } from "react";

import { Button } from "@commons/Button";
import { CardMenu } from "@containers/Home/components/Institution/components/CardMenu";
import { Saside, Ssection, Swrapper } from "./styles";

import Nav from "./components/Nav";

import {
  UserContextConfig,
  UserContextConfigType,
} from "src/context/userContextConfig";

import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

type PropsType = {};

export const Institution = ({}: PropsType) => {
  const { theme } = useContext(UserContextConfig) as UserContextConfigType;

  const { expense, selectedInstitution } = useContext(
    userContextData
  ) as userContextDataType;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Swrapper>
      <nav>
        <Nav institutions={expense?.institutions || []} />
      </nav>

      {expense?.institutions?.map((institutionMap, index) => {
        if (institutionMap.name === selectedInstitution?.name) {
          return (
            <div key={index}>
              <Ssection>
                <Saside>
                  <CardMenu
                    title={institutionMap?.name?.toUpperCase() || ""}
                    list={[]}
                    background={theme.backgroundPrimary}
                    isFooter={
                      <Button
                        color="#fff"
                        background="#1b66ff"
                        width="100%"
                        onClick={() => {
                          setIsVisible(!isVisible);
                        }}
                      >
                        Novo cartão
                      </Button>
                    }
                  />
                  <CardMenu
                    title="TOTAL MENSAL"
                    list={[]}
                    background={theme.backgroundPrimary}
                  />
                </Saside>

                {/* <Shopping /> */}
              </Ssection>

              {/* <Modal
                title="Criando novo cartão"
                isVisible={isVisible}
                handlerIsVisible={() => {
                  setIsVisible(!isVisible);
                  setNewInstitution(initialNewInstitution);
                }}
                footer={
                  <Button
                    color="#fff"
                    background="#1b66ff"
                    disabled={isResponse}
                    onClick={submitNewInstitution}
                  >
                    Salvar
                  </Button>
                }
              >
                <Input
                  placeholder="Nome do cartão"
                  value={newInstitution.name}
                  autoFocus
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {}}
                />
              </Modal> */}
            </div>
          );
        }
      })}
    </Swrapper>
  );
};
