import React from "react";
import ContentAmount from "../ContentAmount";

import { SsubTable } from "./styles";

type ShoppingType = {
  description: string;
  amount: string;
  responsible: string;
};

type PropsType = {
  shoppingList: ShoppingType[];
};

export const ShoppingTable = ({ shoppingList }: PropsType) => {
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
            {shoppingList.map((shopping, index) => (
              <tr key={index}>
                <td>{shopping.description}</td>
                <td>{shopping.amount}</td>
                <td>{shopping.responsible}</td>
              </tr>
            ))}

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
