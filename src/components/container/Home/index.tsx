import React from "react";
import Cookies from "universal-cookie";
import { getExpense } from "../../../api/expense";

import { Institution } from "@containers/Home/components/Institution";

import { Scontainer } from "./styles";
import { ExpenseType } from "@interfaces/*";

function Home() {
  const cookies = new Cookies();

  const [expense, setExpense] = React.useState<ExpenseType>();

  const getExpenseData = async () => {
    const { filter } = await cookies.get("expense-manager");

    const response = await getExpense(filter?.expense?.id);

    setExpense(response.data);
  };

  React.useEffect(() => {
    getExpenseData();
  }, []);

  return (
    <Scontainer>
      <Institution institutions={expense?.institutions || []} />
    </Scontainer>
  );
}

export default Home;
