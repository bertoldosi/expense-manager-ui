import React from "react";

import { Card } from "@commons/Card";
import { Modal } from "@commons/Modal";
import ManagerExpenseForm from "@containers/ManagerExpense/ManagerExpenseForm";

export const ManagerExpense = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <div>
      <Card title="Novo gasto:">
        <ManagerExpenseForm />
      </Card>

      <Modal
        isVisible={isVisible}
        handlerIsVisible={setIsVisible}
        title="Editando gasto"
      >
        <ManagerExpenseForm />
      </Modal>
    </div>
  );
};
