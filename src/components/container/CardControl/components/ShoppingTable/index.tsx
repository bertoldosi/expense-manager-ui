import React from "react";
import ContentAmount from "../ContentAmount";
import InputTable from "../InputTable";

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
                <td>
                  <InputTable value={shopping.description} />
                </td>
                <td>
                  <InputTable value={shopping.amount} />
                </td>
                <td>
                  <InputTable value={shopping.responsible} />
                </td>
              </tr>
            ))}

            <tr>
              <td>
                <InputTable value="" />
              </td>
              <td>
                <InputTable value="" />
              </td>
              <td>
                <InputTable value="" />
              </td>
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
