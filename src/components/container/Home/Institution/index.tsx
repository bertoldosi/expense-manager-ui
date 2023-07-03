import React, { useContext, useState } from "react";

import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import InstitutionMenuCard from "@containers/Home/InstitutionMenuCard";
import InstitutionMenuHeader from "@containers/Home/InstitutionMenuHeader";

import { Saside, Ssection, Swrapper } from "./styles";

import { userContextData, userContextDataType } from "@context/userContextData";
import InstitutionForm from "../InstitutionForm";
import { InstitutionType } from "@interfaces/*";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";

export const Institution = () => {
  const { expense, selectedInstitution } = useContext(
    userContextData
  ) as userContextDataType;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function openModal() {
    setIsModalVisible(!isModalVisible);
  }

  function exitModal() {
    setIsModalVisible(!isModalVisible);
  }

  function deleteInstitution(institution: InstitutionType) {
    instances
      .delete("api/institution", {
        params: {
          institutionId: institution.id,
        },
      })
      .then((response) => {
        console.log(response.data);
        customToast("success", "Sucesso!");
      });
  }

  return (
    <Swrapper>
      <InstitutionMenuHeader institutions={expense?.institutions} />

      {expense?.institutions?.map((institutionMap, index) => {
        if (institutionMap.name === selectedInstitution?.name) {
          return (
            <div key={index}>
              <Ssection>
                <Saside>
                  <InstitutionMenuCard
                    title={institutionMap?.name}
                    items={[]}
                  />
                  <InstitutionMenuCard
                    title="TOTAL MENSAL"
                    items={[]}
                    isFooter={
                      <>
                        <Button onClick={openModal} text="Novo cartão" />
                        <Button
                          onClick={() => {
                            deleteInstitution(institutionMap);
                          }}
                          text={`Excluir ${institutionMap?.name}`}
                          typeButton="delete"
                        />
                      </>
                    }
                  />
                </Saside>

                {/* <Shopping /> */}
              </Ssection>

              <Modal
                title="Criando novo cartão"
                isVisible={isModalVisible}
                handlerIsVisible={exitModal}
              >
                <InstitutionForm exitModal={exitModal} />
              </Modal>
            </div>
          );
        }
      })}
    </Swrapper>
  );
};
