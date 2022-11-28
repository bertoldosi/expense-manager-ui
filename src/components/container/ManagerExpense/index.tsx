import React from "react";
import { Card } from "@commons/Card";

import { Slist, Sexpenses } from "./styles";
import { Trash } from "@icons/Trash";
import { Edit } from "@icons/Edit";
import { ExpenseData } from "./components/ExpenseData";
import { Modal } from "@commons/Modal";

export const ManagerExpense = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <>
      <Card title="Novo gasto:">
        <ExpenseData />
      </Card>

      <Card title="Gerenciar gastos:">
        <Sexpenses>
          <Slist>
            <div>
              <span>matheus@gmail.com</span>
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
            <div>
              <span>matheus@gmail.com</span>
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
