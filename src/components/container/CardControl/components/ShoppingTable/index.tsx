import React from "react";
import ContentAmount from "../ContentAmount";

import { SsubTable } from "./styles";

export const ShoppingTable = () => {
  return (
    <tr>
      <td colSpan={3}>
        <SsubTable>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Total</th>
              <th>Responsável</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Amazon LTDA</td>
              <td>R$ 19,90</td>
              <td>Matheus</td>
            </tr>

            <tr className="no-border">
              <td colSpan={3}>
                <ContentAmount />
              </td>
            </tr>
          </tbody>
        </SsubTable>
      </td>
    </tr>
  );
};
