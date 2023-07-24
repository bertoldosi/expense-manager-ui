import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { Card } from "@commons/Card";
import ManagerExpenseForm from "@containers/ManagerExpense/ManagerExpenseForm";
import { userContextData, userContextDataType } from "@context/userContextData";
import ManagerExpenseList from "@containers/ManagerExpense/ManagerExpenseList";

export const ManagerExpense = () => {
  const { data: session } = useSession();
  const { getUser, user } = React.useContext(
    userContextData
  ) as userContextDataType;

  useEffect(() => {
    if (session?.user) {
      getUser(session?.user?.email);
    }
  }, [session]);

  return (
    <div>
      <Card title="Novo gasto:">
        <ManagerExpenseForm />
      </Card>

      {user?.expenses.length ? (
        <Card title="Gastos:">
          <ManagerExpenseList />
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};
