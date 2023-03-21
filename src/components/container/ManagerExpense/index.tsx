import React from "react";
import { Card } from "@commons/Card";

import { Slist, Sexpenses } from "./styles";
import { Trash } from "@icons/Trash";
import { Edit } from "@icons/Edit";
import { ExpenseData } from "./components/ExpenseData";
import { Modal } from "@commons/Modal";
import { UserAppContext, UserAppContextType } from "src/context/userAppContext";

export const ManagerExpense = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const { person } = React.useContext(UserAppContext) as UserAppContextType;

  return (
    <>
      <Card title="Novo gasto:">
        <ExpenseData />
      </Card>

      <Card title="Gerenciar gastos:">
        <Sexpenses>
          <Slist>
            {person?.expenses.map((expense) => (
              <div>
                <span>{expense.name}</span>
                <div>
                  <Edit
                    width={15}
                    height={15}
                    onClick={() => {
                      setIsVisible((prevState) => !prevState);
                    }}
                  />
                  <Trash width={15} height={15} />
                </div>
              </div>
            ))}
          </Slist>
        </Sexpenses>
      </Card>

      <Modal
        isVisible={isVisible}
        handlerIsVisible={setIsVisible}
        title="Editando gasto"
      >
        <ExpenseData />
      </Modal>
    </>
  );
};
