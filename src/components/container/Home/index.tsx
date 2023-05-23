import React from "react";
import { Institution } from "@containers/Home/components/Institution";

import { Scontainer } from "./styles";
import { UserAppContext, UserAppContextType } from "src/context/userAppContext";

function Home() {
  const { expense, getExpenseData } = React.useContext(
    UserAppContext
  ) as UserAppContextType;

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
