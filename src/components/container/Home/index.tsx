import React from "react";

import Header from "@commons/Header";
import { Institution } from "@containers/Home/components/Institution";

import { Scontainer } from "./styles";
import { UserContext, UserContextType } from "src/context/userContext";
import { HeadeToggleTheme } from "./components/HeadeToggleTheme/components/ToggleThemeButton";

function Home() {
  const { months, nowMonth, toggleTheme } = React.useContext(
    UserContext
  ) as UserContextType;

  return (
    <Scontainer>
      <HeadeToggleTheme />
      <Header />
      {months.map(
        (monthMap, index) =>
          monthMap.mesNumber === nowMonth && (
            <Institution key={index} month={monthMap} />
          )
      )}
    </Scontainer>
  );
}

export default Home;
