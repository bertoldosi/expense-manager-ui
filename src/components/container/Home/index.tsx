import React from "react";
import { Institution } from "@containers/Home/components/Institution";

import { Scontainer } from "./styles";
import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

function Home() {
  const { expense, getExpenseData } = React.useContext(
    userContextData
  ) as userContextDataType;

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
