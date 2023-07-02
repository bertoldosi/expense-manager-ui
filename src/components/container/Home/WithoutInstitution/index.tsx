import React, { useState } from "react";

import { CardMenu } from "@containers/CardMenu";
import { Button } from "@commons/Button";
import { Modal } from "@commons/Modal";
import Form from "@containers/Home/FormInstitution";
import Nav from "@containers/Nav";

import { Saside, Ssection } from "@containers/Home/Institution/styles";
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
