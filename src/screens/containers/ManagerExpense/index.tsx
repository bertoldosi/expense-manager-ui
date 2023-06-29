import React from "react";

import { Card } from "@components/Card";
import { Modal } from "@components/Modal";
import { ExpenseData } from "@components/ExpenseData";

export const ManagerExpense = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <div>
      <Card title="Novo gasto:">
        <ExpenseData />
      </Card>

      <Modal
        isVisible={isVisible}
        handlerIsVisible={setIsVisible}
        title="Editando gasto"
      >
        <ExpenseData />
      </Modal>
    </div>
  );
};
