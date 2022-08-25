// eslint-disable-next-line import/no-anonymous-default-export
import { v4 as uuidv4 } from "uuid";

export default [
  {
    id: "debito-card",
    institution: "Débito",
    amount: "R$ 19,90",
    expiration_date: "10/10/2022",
    shopping: [
      {
        id: uuidv4(),
        description: "Amazon",
        amount: "R$ 19,90",
        responsible: "matheus",
      },

      {
        id: uuidv4(),
        description: "Shoope",
        amount: "R$ 199,90",
        responsible: "fran",
      },
    ],
  },

  {
    id: "nubank-card",
    institution: "Nubank",
    amount: "R$ 19,90",
    expiration_date: "10/10/2022",
    shopping: [
      {
        id: uuidv4(),
        description: "Amazon",
        amount: "R$ 19,90",
        responsible: "matheus",
      },

      {
        id: uuidv4(),
        description: "Shoope",
        amount: "R$ 199,90",
        responsible: "fran",
      },
    ],
  },
];
