import React, { Dispatch, SetStateAction, useState } from "react";

import { Scontainer } from "./styles";
import Nav from "../Nav";
import { Saside, Ssection } from "../../styles";
import { CardMenu } from "../CardMenu";
import { Button } from "@commons/Button";
import {
  UserContextConfig,
  UserContextConfigType,
} from "src/context/userContextConfig";
import { Modal } from "@commons/Modal";
import Input from "@commons/Input";
import { InstitutionType, ShoppingType } from "@interfaces/*";

interface WithoutInstitutionType {
  submitNewInstitution: () => void;
  initialNewInstitution: {
    name: string;
    amount: number | string;
    shoppings: ShoppingType[];
  };
  newInstitution: InstitutionType;
  setNewInstitution: Dispatch<SetStateAction<void>>;
}

export const WithoutInstitution = ({
  submitNewInstitution,
  initialNewInstitution,
  newInstitution,
  setNewInstitution,
}: any) => {
  const { theme } = React.useContext(
    UserContextConfig
  ) as UserContextConfigType;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Scontainer>
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
    </Scontainer>
  );
};
