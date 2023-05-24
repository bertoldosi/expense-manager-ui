import React from "react";
import { Card } from "@commons/Card";

import { ExpenseData } from "./components/ExpenseData";
import { Modal } from "@commons/Modal";
import { Scontainer } from "./styles";

export const ManagerExpense = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <Scontainer>
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
    </Scontainer>
  );
};
