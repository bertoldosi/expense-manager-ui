import React, { useContext, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";

import { Institution } from "@containers/Home/Institution";
import WithoutInstitution from "@containers/Home/Institution/WithoutInstitution";
import { userContextData, userContextDataType } from "@context/userContextData";

import { Scontainer } from "./styles";
import InstitutionMenuFilter from "./InstitutionMenuFilter";
import instances from "@lib/axios-instance-internal";
import { ExpenseType, InstitutionType } from "@interfaces/*";

function Home() {
  const cookies = new Cookies();

  const { setInstitution, expense, setExpense } = useContext(
    userContextData
  ) as userContextDataType;

  function fethInstitution(expenses: ExpenseType) {
    const cookieValues = cookies.get("expense-manager");
    const institutionId = cookieValues?.filter?.institution?.id;

    const filter = expenses?.institutions?.find(
      (institutionFind: InstitutionType) => institutionFind.id === institutionId
    );

    if (filter) {
      instances
        .get("api/institution", {
          params: {
            id: institutionId,
          },
        })
        .then((responseInstitution) => {
          setInstitution(responseInstitution.data);
        });
    } else {
      setInstitution(null);
    }
  }

  function fethExpense() {
    const cookieValues = cookies.get("expense-manager");
    const expenseId = cookieValues?.filter?.expense?.id;
    const institutionsCreateAt = cookieValues?.filter?.institutions?.createAt;

    instances
      .get("api/expense", {
        params: {
          id: expenseId,
          institutionsCreateAt: institutionsCreateAt,
        },
      })
      .then(async (responseExpense) => {
        await fethInstitution(responseExpense.data);

        return setExpense(responseExpense.data);
      });
  }

  useEffect(() => {
    fethExpense();
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
