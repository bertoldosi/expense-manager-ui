import React, {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { Scontainer } from "./styles";
import Nav from "../Nav";
import { Saside, Ssection } from "../../styles";
import { CardMenu } from "../CardMenu";
import { Button } from "@commons/Button";
import { Modal } from "@commons/Modal";
import Input from "@commons/Input";
import { InstitutionType, ShoppingType } from "@interfaces/*";

import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

import {
  UserContextConfig,
  UserContextConfigType,
} from "src/context/userContextConfig";

interface InitialNewInstitutionType {
  name: string;
  amount: number | string;
  shoppings: ShoppingType[];
}

interface WithoutInstitutionType {
  submitNewInstitution: MouseEventHandler<HTMLButtonElement>;
  initialNewInstitution: InitialNewInstitutionType;
  newInstitution: InstitutionType;
  setNewInstitution: Dispatch<SetStateAction<InstitutionType>>;
  isResponse: boolean;
}

export const WithoutInstitution = ({
  submitNewInstitution,
  initialNewInstitution,
  newInstitution,
  setNewInstitution,
  isResponse,
}: WithoutInstitutionType) => {
  const { theme } = useContext(UserContextConfig) as UserContextConfigType;

  const { expense } = useContext(userContextData) as userContextDataType;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Scontainer>
      <div>
        <nav>
          <Nav institutions={expense?.institutions || []} />
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
                disabled={isResponse}
              >
                Salvar
              </Button>
            </>
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
    </Scontainer>
  );
};
