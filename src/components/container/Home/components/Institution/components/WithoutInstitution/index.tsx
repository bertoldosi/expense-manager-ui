import React, { useState } from "react";

import { Scontainer } from "./styles";
import Nav from "../Nav";
import { Saside, Ssection } from "../../styles";
import { CardMenu } from "../CardMenu";
import { Button } from "@commons/Button";
import { UserContext, UserContextType } from "src/context/userContext";
import { Modal } from "@commons/Modal";
import Input from "@commons/Input";
import Cookies from "universal-cookie";
import { createInstitution } from "@api/institution";
import { InstitutionType } from "@interfaces/*";

const initialNewInstitution = {
  name: "",
  amount: 0,
  shoppings: [],
};

export const WithoutInstitution = () => {
  const { theme } = React.useContext(UserContext) as UserContextType;

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

  return (
    <Scontainer>
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
          </Saside>
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
    </Scontainer>
  );
};
