import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Institution } from "@containers/Home/components/Institution";

import { Scontainer } from "./styles";
import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";
import Cookies from "universal-cookie";

function Home() {
  const { getExpense } = useContext(userContextData) as userContextDataType;

  useEffect(() => {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    getExpense(cookieValues?.filter?.expense?.id);
  }, []);

  return (
    <Scontainer>
      <Institution />
    </Scontainer>
  );
}

export default Home;
