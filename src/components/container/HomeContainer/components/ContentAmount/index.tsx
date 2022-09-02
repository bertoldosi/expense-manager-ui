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
