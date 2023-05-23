import React, { useState } from "react";

import { InstitutionType } from "@interfaces/";

import { Button } from "@commons/Button";
import { CardMenu } from "@containers/Home/components/Institution/components/CardMenu";
import { Shopping } from "@containers/Home/components/Shopping";
import { Saside, Ssection, Swrapper } from "./styles";
import {
  UserContextConfig,
  UserContextConfigType,
} from "src/context/userContextConfig";
import { WithoutInstitution } from "./components/WithoutInstitution";
import Nav from "./components/Nav";
import { Modal } from "@commons/Modal";
import Input from "@commons/Input";
import { createInstitution } from "@api/institution";
import Cookies from "universal-cookie";
import { customToast } from "@commons/CustomToast";
import Router from "next/router";

type PropsType = {
  institutions: InstitutionType[];
};

const initialNewInstitution = {
  id: "",
  name: "",
  amount: 0,
  shoppings: [],
};

export const Institution = ({ institutions }: PropsType) => {
  const { nameSelectedInstitution, theme } = React.useContext(
    UserContextConfig
  ) as UserContextConfigType;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newInstitution, setNewInstitution] = useState<InstitutionType>(
    initialNewInstitution
  );

  async function submitNewInstitution() {
    const cookies = new Cookies();

    const { filter } = cookies.get("expense-manager");

    createInstitution({
      ...newInstitution,
      expenseId: filter.expense.id,
    })
      .then(() => {
        customToast("success", "Cartão incluído com sucesso!");
      })
      .catch(() => {
        customToast(
          "error",
          "Algo de errado aconteceu ao tentar incluir novo cartão!"
        );
      })
      .finally(() => {
        Router.reload();
      });
  }

  if (institutions.length === 0) {
    return (
      <WithoutInstitution
        submitNewInstitution={submitNewInstitution}
        initialNewInstitution={initialNewInstitution}
        newInstitution={newInstitution}
        setNewInstitution={setNewInstitution}
      />
    );
  }

  return (
    <Swrapper>
      <nav>
        <Nav institutions={institutions} />
      </nav>

      {institutions?.map((institutionMap, index) => {
        if (institutionMap.name === nameSelectedInstitution) {
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
                          onClick={() => {
                            setIsVisible(!isVisible);
                          }}
                        >
                          Novo cartão
                        </Button>
                      </>
                    }
                  />
                  <CardMenu
                    title="TOTAL MENSAL"
                    list={[]}
                    background={theme.backgroundPrimary}
                  />
                </Saside>
                <Shopping institution={institutionMap} />
              </Ssection>

              <Modal
                title="Criando novo cartão"
                isVisible={isVisible}
                handlerIsVisible={() => {
                  setIsVisible(!isVisible);
                  setNewInstitution(initialNewInstitution);
                }}
                footer={
                  <>
                    <Button
                      color="#fff"
                      background="#1b66ff"
                      onClick={submitNewInstitution}
                    >
                      Salvar
                    </Button>
                  </>
                }
              >
                <Input
                  placeholder="Nome do cartão"
                  value={newInstitution.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewInstitution({
                      ...newInstitution,
                      name: event.target.value,
                    });
                  }}
                />
              </Modal>
            </div>
          );
        }
      })}
    </Swrapper>
  );
};
