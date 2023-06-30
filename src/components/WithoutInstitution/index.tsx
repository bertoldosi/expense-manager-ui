import React, { useState } from "react";

import { CardMenu } from "@components/CardMenu";
import { Button } from "@components/Button";
import { Modal } from "@components/Modal";
import Form from "@components/FormInstitution";
import Nav from "@components/Nav";

import { Saside, Ssection } from "@components/Institution/styles";
import { Scontainer } from "./styles";

export const WithoutInstitution = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function handlerIsVisibleModal() {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <Scontainer>
      <div>
        <Nav />
        <Ssection>
          <Saside>
            <CardMenu
              isFooter={
                <Button text="Novo cartão" onClick={handlerIsVisibleModal} />
              }
            />
          </Saside>
        </Ssection>

        <Modal
          title="Criando novo cartão"
          isVisible={isModalVisible}
          handlerIsVisible={handlerIsVisibleModal}
        >
          <Form />
        </Modal>
      </div>
    </Scontainer>
  );
};
