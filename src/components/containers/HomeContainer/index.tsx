import React from "react";
import Header from "../../common/Header";
import { Content } from "../Content";

import { Scontainer } from "./styles";

function HomeContainer() {
  return (
    <Scontainer>
      <Header
        list={[
          "JAN",
          "FEV",
          "MAR",
          "ABR",
          "MAI",
          "JUN",
          "JUL",
          "AGO",
          "SET",
          "OUT",
          "NOV",
          "DEZ",
        ]}
      />
      <Content />
    </Scontainer>
  );
}

export default HomeContainer;
