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

// client.mutate({
//   mutation: gql`
//     mutation CreateInstitution {
//       createInstitution(
//         data: { name: "Teste teste", expirationDate: "2022-10-10" }
//       ) {
//         id
//       }
//     }
//   `,
// });

export default [
  {
    name: "Jan",
    mesNumber: 1,
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
    mesNumber: 2,
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
  {
    name: "Mar",
    mesNumber: 3,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
  {
    name: "Abr",
    mesNumber: 4,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
  {
    name: "Mai",
    mesNumber: 5,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
  {
    name: "Jun",
    mesNumber: 6,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
  {
    name: "Jul",
    mesNumber: 7,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
  {
    name: "Ago",
    mesNumber: 8,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
  {
    name: "Set",
    mesNumber: 9,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
  {
    name: "Out",
    mesNumber: 10,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
  {
    name: "Nov",
    mesNumber: 11,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
  {
    name: "Dez",
    mesNumber: 12,
    institutions: [
      {
        id: "cl7aqiqzw35g30cj1fb8zxdyz",
        name: "Nubank",
        amount: "0",
        expirationDate: "2022-10-10",
        shoppings: [],
      },
    ],
  },
];
