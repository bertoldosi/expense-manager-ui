import React from "react";
import { ResponsibleAmountType } from "../../types";
import { Stotal } from "./styles";

type PropsType = {
  responsibleList: ResponsibleAmountType[];
};

function ContentAmount({ responsibleList }: PropsType) {
  return (
    <Stotal>
      <thead>
        <tr>
          <th>Responsavel</th>
          <th>(R$)</th>
        </tr>
      </thead>

      <tbody>
        {responsibleList.map((responsible, index) => (
          <tr key={index}>
            <td>{responsible.responsible}</td>
            <td>{responsible.amount}</td>
          </tr>
        ))}
      </tbody>
    </Stotal>
  );
}

export default ContentAmount;
