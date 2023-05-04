import React, { useState } from "react";

import { InstitutionType } from "@interfaces/";

import { Button } from "@commons/Button";
import { CardMenu } from "@containers/Home/components/Institution/components/CardMenu";
import { Shopping } from "@containers/Home/components/Shopping";
import { Saside, Ssection, Swrapper } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";
import { WithoutInstitution } from "./components/WithoutInstitution";
import Nav from "./components/Nav";
import { Modal } from "@commons/Modal";
import Input from "@commons/Input";
import { createInstitution } from "@api/institution";
import Cookies from "universal-cookie";

type PropsType = {
  institutions: InstitutionType[];
};

const initialNewInstitution = {
  name: "",
  amount: 0,
  shoppings: [],
};

export const Institution = ({ institutions }: PropsType) => {
  const { listResponsibleTotalMonth, nowCard, theme } = React.useContext(
    UserContext
  ) as UserContextType;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [newInstitution, setNewInstitution] = useState<InstitutionType>(
    initialNewInstitution
  );

  async function submitNewInstitution() {
    const cookies = new Cookies();

    const { filter } = cookies.get("expense-manager");

    await createInstitution({
      ...newInstitution,
      expenseId: filter.expense.id,
    });
  }

  if (institutions.length === 0) {
    return <WithoutInstitution />;
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
                      list={listResponsibleTotalMonth}
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
    </>
  );
};
