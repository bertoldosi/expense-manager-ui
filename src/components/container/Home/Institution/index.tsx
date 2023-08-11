import React, { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const doc = new jsPDF();

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
import { formatMorney } from "@helpers/formatMorney";
import moment from "moment";
import orderByCategory from "@helpers/orderByCategory";

interface CategoryTotalsType {
  category: string;
  total: number;
}
interface CategoryTotalsMonthType {
  date: string;
  categoryTotals: CategoryTotalsType[];
}
interface TotalsMonthType {
  date: string;
  total: number;
}

export const Institution = () => {
  const cookies = new Cookies();

  const { getExpense, institution, setInstitution, expense } = useContext(
    userContextData
  ) as userContextDataType;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [institutionUpdate, setInstitutionUpdate] =
    useState<InstitutionType | null>(null);

  const [categotyTotalsMonth, setCategoryTotalsMonth] =
    useState<CategoryTotalsMonthType>();
  const [totalsMonth, setTotalsMonth] = useState<TotalsMonthType>();

  function openModal() {
    setIsModalVisible(!isModalVisible);
  }

  function exitModal() {
    setIsModalVisible(!isModalVisible);
    setInstitutionUpdate(null);
  }

  async function deleteInstitution(institution: InstitutionType) {
    async function requestDelete() {
      return await instances
        .delete("api/institution", {
          params: {
            institutionId: institution.id,
          },
        })
        .then(async () => {
          const { filter } = cookies.get("expense-manager");

          await getExpense(filter?.expense?.id, filter.institutions.createAt);
          setInstitution(null);
        });
    }

    await customToast(requestDelete);
  }

  async function updateInstitution(institutionData: InstitutionType) {
    setInstitutionUpdate(institutionData);
    openModal();
  }

  function getCategoryTotalsMonthAndTotalsMonth(categoryTotals, totalsMonth) {
    const { filter } = cookies.get("expense-manager");

    const categoryTotalsFilter = categoryTotals.find(
      (categoryTotal: any) =>
        categoryTotal.date === filter.institutions.createAt
    );

    const totalMonthFilter = totalsMonth.find(
      (categoryTotalPerDate) =>
        categoryTotalPerDate.date === filter.institutions.createAt
    );

    setCategoryTotalsMonth(categoryTotalsFilter);
    setTotalsMonth(totalMonthFilter);
  }

  async function report() {
    if (expense?.institutions?.length) {
      expense.institutions?.map((institution: InstitutionType) => {
        const shoppings: any = [];

        //está causando erros no relatorio, gerando cache e misturando meses
        // institution.shoppings?.sort(orderByCategory);
        institution.shoppings?.map((shopping): void => {
          const amount = formatMorney(shopping.amount);
          shoppings.push([shopping.description, amount, shopping.category]);
        });

        autoTable(doc, {
          theme: "grid",
          head: [
            [`#${institution.name} ${institution.createAt}`, "", ""],
            ["DESCRIÇÃO", "VALOR", "CATEGORIA"],
          ],
          body: shoppings,
          showHead: "firstPage",
          showFoot: "lastPage",
        });
      });

      const dateNow = moment().format("DD-MM-YYYY");

      doc.save(`relatorio-de-gastos-${dateNow}`);
    }
  }

  useEffect(() => {
    if (expense?.categoryTotalPerDate && expense?.totalPerDate) {
      getCategoryTotalsMonthAndTotalsMonth(
        expense.categoryTotalPerDate,
        expense.totalPerDate
      );
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
                openSettings={() => {
                  updateInstitution(institution);
                }}
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

                    <Button
                      onClick={report}
                      text="Baixar relatório"
                      typeButton=""
                    />
                  </>
                }
              />
            </Saside>

            <Shopping />
          </Ssection>

          <Modal
            title={
              institutionUpdate ? "Editando cartão" : "Criando novo cartão"
            }
            isVisible={isModalVisible}
            handlerIsVisible={exitModal}
          >
            <InstitutionForm
              exitModal={exitModal}
              institution={institutionUpdate}
            />
          </Modal>
        </div>
      ) : (
        ""
      )}
    </Swrapper>
  );
};
