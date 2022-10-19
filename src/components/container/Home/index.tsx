import React from "react";

import Header from "@commons/Header";
import { Content } from "@containers/Home/components/Content";

import { Scontainer } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";

function Home() {
  const { months, nowMonth } = React.useContext(UserContext) as UserContextType;

  return (
    <Scontainer>
      <Header />

      {months.map(
        (monthMap, index) =>
          monthMap.mesNumber === nowMonth && (
            <Content key={index} month={monthMap} />
          )
      )}
    </Scontainer>
  );
}

export default Home;
