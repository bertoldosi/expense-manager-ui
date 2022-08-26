// eslint-disable-next-line import/no-anonymous-default-export
import { v4 as uuidv4 } from "uuid";

// query MyQuery {
//   institutions {
//     id
//     name
//     amount
//     expirationDate
//     shoppings {
//       ... on Shopping {
//         id
//         description
//         amount
//         responsible
//       }
//     }
//   }
// }

export default [
  {
    id: "debito-card",
    name: "Débito",
    amount: "R$ 19,90",
    expirationDate: "10/10/2022",
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
    name: "Nubank",
    amount: "R$ 19,90",
    expirationDate: "10/10/2022",
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
