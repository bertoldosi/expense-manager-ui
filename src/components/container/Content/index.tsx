import React from "react";
import Header from "./components/Header";

import { Swrapper } from "./styles";

export const Content = () => {
  return (
    <Swrapper>
      <nav>
        <Header list={["DEBITO", "NUBANK", "INTER", "BRADESCO", "SANTANDER"]} />
      </nav>

      <section>
        <aside>menu</aside>
        <article>table</article>
      </section>
    </Swrapper>
  );
};
