import React, { ChangeEvent, useState } from "react";

import { Scontainer } from "./styles";
import Nav from "../Institution/components/Nav";
import { Saside, Ssection } from "../Institution/styles";
import { CardMenu } from "../Institution/components/CardMenu";
import { Button } from "@commons/Button";
import { Modal } from "@commons/Modal";
import Form from "../Institution/components/Form";

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
