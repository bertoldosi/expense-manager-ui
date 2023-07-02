import React, { useState } from "react";

import { CardMenu } from "@containers/Home/InstitutionMenuCard";
import { Button } from "@commons/Button";
import { Modal } from "@commons/Modal";
import Form from "@containers/Home/InstitutionForm";
import Nav from "@containers/Home/InstitutionMenuHeader";

import { Saside, Ssection } from "@containers/Home/Institution/styles";
import { ScontainerWithoutInstitution } from "./styles";

function WithoutInstitution() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function handlerIsVisibleModal() {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <ScontainerWithoutInstitution>
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
    </ScontainerWithoutInstitution>
  );
}

export default WithoutInstitution;
