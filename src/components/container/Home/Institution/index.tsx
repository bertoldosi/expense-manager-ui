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
import Shopping from "@containers/Home/Shopping";
import Cookies from "universal-cookie";

export const Institution = () => {
  const cookies = new Cookies();

  const { getExpense, institution, categories } = useContext(
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
        const { filter } = cookies.get("expense-manager");

        getExpense(filter?.expense?.id, filter.institutions.createAt);
        customToast("success", "Sucesso!");
      });
  }

  return (
    <Swrapper>
      <InstitutionMenuHeader />

      {institution ? (
        <div>
          <Ssection>
            <Saside>
              <InstitutionMenuCard
                title={institution?.name}
                items={categories.map((categorie) => ({
                  name: categorie.category,
                  amount: categorie.total,
                }))}
              />
              <InstitutionMenuCard
                title="TOTAL MENSAL"
                items={[]}
                isFooter={
                  <>
                    <Button onClick={openModal} text="Novo cartão" />
                    <Button
                      onClick={() => {
                        deleteInstitution(institution);
                      }}
                      text={`Excluir ${institution?.name}`}
                      typeButton="delete"
                    />
                  </>
                }
              />
            </Saside>

            <Shopping />
          </Ssection>

          <Modal
            title="Criando novo cartão"
            isVisible={isModalVisible}
            handlerIsVisible={exitModal}
          >
            <InstitutionForm exitModal={exitModal} />
          </Modal>
        </div>
      ) : (
        ""
      )}
    </Swrapper>
  );
};
