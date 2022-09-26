import React from "react";
import { Expenses } from "../Expenses";
import { CardMenu } from "../../common/CardMenu";
import Nav from "../../common/Nav";

import { Sarticle, Saside, Ssection, Swrapper } from "./styles";

export const Content = () => {
  return (
    <Swrapper>
      <nav>
        <Nav list={["DEBITO", "NUBANK", "INTER", "BRADESCO", "SANTANDER"]} />
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
