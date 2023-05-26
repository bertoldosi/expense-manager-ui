import React, { ChangeEvent, useContext, useState } from "react";
import Cookies from "universal-cookie";

import { InstitutionType } from "@interfaces/";

import { Button } from "@commons/Button";
import { CardMenu } from "@containers/Home/components/Institution/components/CardMenu";
import { Shopping } from "@containers/Home/components/Shopping";
import { Saside, Ssection, Swrapper } from "./styles";

import { WithoutInstitution } from "./components/WithoutInstitution";
import { createInstitution } from "@api/institution";
import { customToast } from "@commons/CustomToast";
import { Modal } from "@commons/Modal";
import Nav from "./components/Nav";
import Input from "@commons/Input";

import {
  UserContextConfig,
  UserContextConfigType,
} from "src/context/userContextConfig";

import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

type PropsType = {};

const initialNewInstitution = {
  id: "",
  name: "",
  amount: 0,
  shoppings: [],
};

export const Institution = ({}: PropsType) => {
  const { selectedInstitution, theme, toggleSelectedInstitution } = useContext(
    UserContextConfig
  ) as UserContextConfigType;

  const { getExpense, expense } = useContext(
    userContextData
  ) as userContextDataType;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState<boolean>(false);
  const [newInstitution, setNewInstitution] = useState<InstitutionType>(
    initialNewInstitution
  );

  async function submitNewInstitution() {
    setIsResponse(true);

    const cookies = new Cookies();
    const coockieValues = cookies.get("expense-manager");

    await createInstitution({
      ...newInstitution,
      expenseId: coockieValues.filter.expense.id,
    })
      .then(() => {
        customToast("success", "Cartão incluído com sucesso!");
      })
      .catch(() => {
        customToast("error", "Tente novamente mais tarde!");
      });

    await getExpense(coockieValues.filter.expense.id);
    toggleSelectedInstitution(newInstitution);
    setIsResponse(false);
    setIsVisible(false);
    setNewInstitution(initialNewInstitution);
  }

  if (expense?.institutions.length === 0) {
    return (
      <WithoutInstitution
        submitNewInstitution={submitNewInstitution}
        initialNewInstitution={initialNewInstitution}
        newInstitution={newInstitution}
        setNewInstitution={setNewInstitution}
        isResponse={isResponse}
      />
    );
  }

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
                    title={`TOTAL ${institutionMap.name.toUpperCase()}`}
                    list={institutionMap.listResponsibleValues}
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
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
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
