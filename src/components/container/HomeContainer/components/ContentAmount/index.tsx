import React from "react";
import { Stotal } from "./styles";

type ResponsibleType = {
  name: string;
  amount: string;
};

type PropsType = {
  responsibleList: ResponsibleType[];
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
            <td>{responsible.name}</td>
            <td>{responsible.amount}</td>
          </tr>
        ))}
      </tbody>
    </Stotal>
  );
}

export default ContentAmount;
