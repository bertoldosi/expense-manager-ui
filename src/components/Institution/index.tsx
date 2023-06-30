import React, { useContext, useState } from "react";

import Nav from "@components/Nav";
import { Button } from "@components/Button";
import { CardMenu } from "@components/CardMenu";

import { Saside, Ssection, Swrapper } from "./styles";

import { userContextData, userContextDataType } from "@context/userContextData";

export const Institution = () => {
  const { expense, selectedInstitution } = useContext(
    userContextData
  ) as userContextDataType;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Swrapper>
      <Nav institutions={expense?.institutions} />

      {expense?.institutions?.map((institutionMap, index) => {
        if (institutionMap.name === selectedInstitution?.name) {
          return (
            <div key={index}>
              <Ssection>
                <Saside>
                  <CardMenu
                    title={institutionMap?.name?.toUpperCase() || ""}
                    items={[]}
                    isFooter={
                      <Button
                        onClick={() => {
                          setIsVisible(!isVisible);
                        }}
                        text="Novo cartão"
                      />
                    }
                  />
                  <CardMenu title="TOTAL MENSAL" items={[]} />
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
