import React, { useContext, useEffect, useState } from "react";

import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import InstitutionMenuCard from "@containers/Home/InstitutionMenuCard";
import InstitutionMenuHeader from "@containers/Home/InstitutionMenuHeader";

import { Saside, Ssection, Swrapper } from "./styles";

import { userContextData, userContextDataType } from "@context/userContextData";
import InstitutionForm from "../InstitutionForm";
import {
  CategoryTotalsMonthType,
  CategoryType,
  InstitutionType,
  TotalAmountType,
} from "@interfaces/*";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import Shopping from "@containers/Home/Shopping";
import Cookies from "universal-cookie";

export const Institution = () => {
  const cookies = new Cookies();

  const { getExpense, institution, expense } = useContext(
    userContextData
  ) as userContextDataType;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [categotyTotalsMonth, setCategoryTotalsMonth] =
    useState<CategoryTotalsMonthType | null>(null);
  const [totalsMonth, setTotalsMonth] = useState<TotalAmountType | null>(null);

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

  function getCategoryTotalsMonth(categoryTotals: CategoryTotalsMonthType[]) {
    const { filter } = cookies.get("expense-manager");

    const categoryTotalsFilter = categoryTotals.find(
      (categoryTotal) => categoryTotal.date === filter.institutions.createAt
    );

    setCategoryTotalsMonth(categoryTotalsFilter || null);
  }

  function getTotalsMonth(totals: TotalAmountType[]) {
    const { filter } = cookies.get("expense-manager");

    const totalMonthFilter = totals.find(
      (categoryTotal) => categoryTotal.date === filter.institutions.createAt
    );

    setTotalsMonth(totalMonthFilter || null);
  }

  useEffect(() => {
    if (expense?.categoryTotals && expense?.totalAmount) {
      getCategoryTotalsMonth(expense.categoryTotals);
      getTotalsMonth(expense.totalAmount);
    }
  }, [expense]);

  return (
    <Swrapper>
      <InstitutionMenuHeader />

      {institution ? (
        <div>
          <Ssection>
            <Saside>
              <InstitutionMenuCard
                title={institution?.name}
                totalAmount={institution.totalAmount || 0}
                items={institution?.categoryTotals?.map((categorie) => ({
                  name: categorie.category,
                  total: categorie.total,
                }))}
              />
              <InstitutionMenuCard
                title="TOTAL MENSAL"
                totalAmount={totalsMonth?.total || 0}
                items={categotyTotalsMonth?.categoryTotals.map((categorie) => ({
                  name: categorie.category,
                  total: categorie.total,
                }))}
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
