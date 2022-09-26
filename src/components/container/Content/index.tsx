import React from "react";
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
          <CardMenu />
        </Saside>
        <Sarticle>table</Sarticle>
      </Ssection>
    </Swrapper>
  );
};
