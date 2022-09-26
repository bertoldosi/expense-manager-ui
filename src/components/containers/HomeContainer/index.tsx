import React from "react";
import useMonth from "../../../hooks/useMonth";
import Header from "../../common/Header";
import { Content } from "../Content";

import { Scontainer } from "./styles";

function HomeContainer() {
  const { getMonths, months, nowMonth, setNowMonth } = useMonth();

  React.useEffect(() => {
    getMonths();
  }, []);

  return (
    <Scontainer>
      <Header months={months} nowMonth={nowMonth} setNowMonth={setNowMonth} />
      <Content />
    </Scontainer>
  );
}

export default HomeContainer;
