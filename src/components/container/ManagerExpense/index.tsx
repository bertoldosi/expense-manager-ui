import React from "react";

import { Card } from "@containers//Card";
import { Modal } from "@commons/Modal";
import { ExpenseData } from "@containers/ExpenseData";

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
