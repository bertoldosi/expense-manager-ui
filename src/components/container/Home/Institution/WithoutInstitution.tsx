import React, { useState } from "react";

import InstitutionMenuHeader from "@containers/Home/InstitutionMenuHeader";
import InstitutionMenuCard from "@containers/Home/InstitutionMenuCard";
import InstitutionForm from "@containers/Home/InstitutionForm";
import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";

import { Saside, Ssection, ScontainerWithoutInstitution } from "./styles";

function WithoutInstitution() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function handlerIsVisibleModal() {
    setIsModalVisible(!isModalVisible);
  }

  return (
    <ScontainerWithoutInstitution>
      <div>
        <InstitutionMenuHeader />
        <Ssection>
          <Saside>
            <InstitutionMenuCard
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
          <InstitutionForm />
        </Modal>
      </div>
    </ScontainerWithoutInstitution>
  );
}

export default WithoutInstitution;
