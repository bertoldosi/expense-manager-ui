import React, { useContext, useMemo } from "react";
import Cookies from "universal-cookie";

import { Institution } from "@containers/Home/Institution";
import WithoutInstitution from "@containers/Home/Institution/WithoutInstitution";
import { userContextData, userContextDataType } from "@context/userContextData";

import { Scontainer } from "./styles";

function Home() {
  const { getExpense, expense } = useContext(
    userContextData
  ) as userContextDataType;

  useMemo(() => {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    getExpense(cookieValues?.filter?.expense?.id);
  }, []);

  if (expense?.institutions?.length) {
    return (
      <Scontainer>
        <Institution />
      </Scontainer>
    );
  }

  return (
    <Scontainer>
      <WithoutInstitution />
    </Scontainer>
  );
}

export default Home;
