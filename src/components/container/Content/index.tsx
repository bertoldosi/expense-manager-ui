import React from "react";
import { Expenses } from "../Expenses";
import { CardMenu } from "./components/CardMenu";
import Header from "./components/Header";

import { Sarticle, Saside, Ssection, Swrapper } from "./styles";

export const Content = () => {
  return (
    <Swrapper>
      <nav>
        <Header list={["DEBITO", "NUBANK", "INTER", "BRADESCO", "SANTANDER"]} />
      </nav>

      <Ssection>
        <Saside>
          <CardMenu />
          <CardMenu isFooter={true} />
        </Saside>
        <Sarticle>
          <Expenses />
        </Sarticle>
      </Ssection>
    </Swrapper>
  );
};
