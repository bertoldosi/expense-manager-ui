import React, { useContext, useEffect } from "react";
import Cookies from "universal-cookie";

import { Institution } from "@containers/Institution";
import { WithoutInstitution } from "@containers/WithoutInstitution";
import { userContextData, userContextDataType } from "@context/userContextData";

import { Scontainer } from "./styles";

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
