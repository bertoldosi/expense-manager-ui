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
    name: "Jan",
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [
          {
            id: "cl7ah039o2v430blxf3c6au36",
            description: "Amazon",
            amount: "10,00",
            responsible: "matheus",
          },
        ],
      },
      {
        id: "cl7aqlnh935mf0cj1glszjb33",
        name: "Débito",
        amount: "0",
        expirationDate: "2022-01-01",
        shoppings: [
          {
            id: "cl7ah039o2v430blxf3c6au36",
            description: "Amazon",
            amount: "10,00",
            responsible: "matheus",
          },
          {
            id: "cl7wde6te3h450bkd17rhttu8",
            description: "Casa",
            amount: "100.000,00",
            responsible: "matheus",
          },
        ],
      },
    ],
  },

  {
    name: "Fev",
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [
          {
            id: "cl7ah039o2v430blxf3c6au36",
            description: "Amazon",
            amount: "10,00",
            responsible: "matheus",
          },
        ],
      },
    ],
  },
];
