import React from "react";

import Header from "@commons/Header";
import { Institution } from "@containers/Home/components/Institution";

import { Scontainer, ScontentNull } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";

function Home() {
  const { months, nowMonth } = React.useContext(UserContext) as UserContextType;

  return (
    <Scontainer>
      <Header />

      {months.length === 0 && (
        <ScontentNull>
          <h2>Acesse o https://hygraph.com e cadastre os meses!</h2>
        </ScontentNull>
      )}

      {months.map(
        (monthMap, index) =>
          monthMap.monthNumber === nowMonth && (
            <Institution key={index} month={monthMap} />
          )
      )}
    </Scontainer>
  );
}

export default Home;
