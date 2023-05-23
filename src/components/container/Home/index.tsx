import React from "react";
import { Institution } from "@containers/Home/components/Institution";

import { Scontainer } from "./styles";
import {
  UserAppContextData,
  UserAppContextDataType,
} from "src/context/userAppContextData";

function Home() {
  const { expense, getExpenseData } = React.useContext(
    UserAppContextData
  ) as UserAppContextDataType;

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
