import React, { useContext, useEffect } from "react";
import { Institution } from "@containers/Home/components/Institution";

import { Scontainer } from "./styles";
import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";
import Cookies from "universal-cookie";
import { WithoutInstitution } from "./components/WithoutInstitution";

function Home() {
  const { getExpense, expense } = useContext(
    userContextData
  ) as userContextDataType;

  useEffect(() => {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    getExpense(cookieValues?.filter?.expense?.id);
  }, []);

  return (
    <Scontainer>
      {expense?.institutions.length ? <Institution /> : <WithoutInstitution />}
    </Scontainer>
  );
}

export default Home;
