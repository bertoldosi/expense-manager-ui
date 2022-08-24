import React from "react";

import { Scontainer, Stable } from "./styles";

import useListCollapsibreTable from "../../../hooks/useListCollapsibreTable";

import Header from "./components/Header";
import IconTable from "./components/IconTable";
import InputTable from "./components/InputTable";
import ContentAmount from "./components/ContentAmount";
import { ShoppingTable } from "./components/ShoppingTable";

type ShoppingType = {
  description: string;
  amount: string;
  responsible: string;
};

type MonthlyExpensesType = {
  id: string;
  institution: string;
  amount: string;
  expiration_date: string;
  shopping: ShoppingType[];
};

type Props = {
  monthly_expenses: MonthlyExpensesType[];
};

function CollapsibleTable({ monthly_expenses }: Props) {
  const { listTable, submenusExpanded } =
    useListCollapsibreTable(monthly_expenses);

  return (
    <Scontainer>
      <Stable>
        <thead>
          <tr>
            <th>Instituição</th>
            <th>Total</th>
            <th>Vencimento</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td># Débito</td>
            <td>R$ 19,90</td>
            <td>10/10/2022</td>
          </tr>

          <ShoppingTable />
        </tbody>
      </Stable>

      <ContentAmount />
    </Scontainer>
  );
}

export default CollapsibleTable;
