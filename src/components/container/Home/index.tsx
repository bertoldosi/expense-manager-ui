import React, { useContext, useMemo } from "react";
import Cookies from "universal-cookie";

import { Institution } from "@containers/Home/Institution";
import WithoutInstitution from "@containers/Home/Institution/WithoutInstitution";
import { userContextData, userContextDataType } from "@context/userContextData";

import { Scontainer } from "./styles";
import InstitutionMenuFilter from "./InstitutionMenuFilter";

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
        <InstitutionMenuFilter />
        <Institution />
      </Scontainer>
    );
  }

  return (
    <Scontainer>
      <InstitutionMenuFilter />
      <WithoutInstitution />
    </Scontainer>
  );
}

export default Home;
