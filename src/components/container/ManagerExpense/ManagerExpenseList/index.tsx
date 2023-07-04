import React, { useState } from "react";

import { userContextData, userContextDataType } from "@context/userContextData";

import { Scontainer, Sicons } from "./styles";
import { Edit } from "@icons/Edit";
import { Trash } from "@icons/Trash";
import { Modal } from "@commons/Modal";
import ManagerExpenseForm from "../ManagerExpenseForm";
import { ExpenseType } from "@interfaces/*";
import instances from "@lib/axios-instance-internal";
import { useSession } from "next-auth/react";
import { customToast } from "@commons/CustomToast";

export interface InitialExpenseType {
  id: string;
  name: string;
}

function ManagerExpenseList() {
  const { data: session } = useSession();
  const { user, getUser } = React.useContext(
    userContextData
  ) as userContextDataType;

  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [expenseInitial, setExpenseInitial] =
    useState<InitialExpenseType | null>(null);

  function openModal(expense: ExpenseType) {
    setExpenseInitial(expense);

    setIsModalVisible((prev) => !prev);
  }

  function exitModal() {
    setExpenseInitial({ name: "", id: "" });
    setIsModalVisible((prev) => !prev);
  }

  function deleteExpense(expense: ExpenseType) {
    instances
      .delete("api/expense", {
        params: {
          id: expense.id,
        },
      })
      .then(() => {
        customToast("success", "Sucesso ao excluir item!");
        getUser(session?.user?.email);
      })
      .catch((error) => {
        if (error.response.status == 405) {
          customToast(
            "error",
            "Antes de deletar este gasto, delete os cartões vinculados a ele por favor!"
          );
        }
      });
  }

  return (
    <>
      <Scontainer>
        {user?.expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name}
            <Sicons>
              <Edit
                width={15}
                height={15}
                onClick={() => {
                  openModal(expense);
                }}
              />
              <Trash
                width={15}
                height={15}
                onClick={() => {
                  deleteExpense(expense);
                }}
              />
            </Sicons>
          </li>
        ))}
      </Scontainer>

      <Modal
        isVisible={isModalVisible}
        handlerIsVisible={exitModal}
        title="Editando gasto"
      >
        <ManagerExpenseForm expenseInitial={expenseInitial} />
      </Modal>
    </>
  );
}

export default ManagerExpenseList;
