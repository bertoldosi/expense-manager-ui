import React from "react";
import { Stotal } from "./styles";

function ContentAmount() {
  return (
    <Stotal>
      <thead>
        <tr>
          <th>Responsavel</th>
          <th>(R$)</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Matheus</td>
          <td>R$ 19,90</td>
        </tr>

        <tr>
          <td>Matheus</td>
          <td>R$ 19,90</td>
        </tr>
      </tbody>
    </Stotal>
  );
}

export default ContentAmount;
