import React from "react";

import { Scontent, Sheader, Ssection } from "./styles";

export const CardMenu = () => {
  return (
    <Scontent>
      <Sheader>
        <h1>TOTAL POR CARTÃO</h1>
      </Sheader>

      <Ssection>
        <span>
          <strong>MATHEUS</strong>
          <strong>R$ 250,00</strong>
        </span>

        <span>
          <strong>MATHEUS</strong>
          <strong>R$ 250,00</strong>
        </span>

        <span>
          <strong>MATHEUS</strong>
          <strong>R$ 250,00</strong>
        </span>
      </Ssection>
      <footer>buttoes</footer>
    </Scontent>
  );
};
