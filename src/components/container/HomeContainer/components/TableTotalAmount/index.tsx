import React from "react";
import { ResponsibleValuesType } from "../../types";
import { Stotal } from "./styles";

type PropsType = {
  listResponsibleValues: ResponsibleValuesType[];
};

function TableTotalAmount({ listResponsibleValues }: PropsType) {
  return (
    <Stotal>
      <thead>
        <tr>
          <th>Responsavel</th>
          <th>(R$)</th>
        </tr>
      </thead>

      <tbody>
        {listResponsibleValues.map((responsible, index) => (
          <tr key={index}>
            <td>{responsible.responsible}</td>
            <td>{responsible.amount}</td>
          </tr>
        ))}
      </tbody>
    </Stotal>
  );
}

export default TableTotalAmount;
