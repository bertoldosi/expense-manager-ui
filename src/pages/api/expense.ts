import { gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";
import instances from "src/lib/axios-instance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (id) {
      try {
        const requestBody = {
          query: gql`
            query Expense($id: ID!) {
              expense(where: { id: $id }) {
                id
                name
                institutions {
                  id
                  name
                  amount
                  shoppings(first: 5000, orderBy: createdAt_DESC) {
                    id
                    description
                    amount
                  }
                }
              }
            }
          `,
          variables: {
            id,
          },
        };

        const response = await instances.post("", requestBody);
        const { data } = response.data;

        return res.status(200).send(data.expense);
      } catch (err) {
        console.log("ERROR AXIOS REQUEST", err);
        return res.send(err);
      }
    } else {
      try {
        const requestBody = {
          query: gql`
            query Expenses {
              expenses {
                id
                name
                persons {
                  email
                }
                institutions {
                  id
                  name
                  amount
                  shoppings {
                    id
                    description
                    amount
                    createdAt
                  }
                }
              }
            }
          `,
          variables: {},
        };

        const response = await instances.post("", requestBody);
        const { data } = response.data;

        return res.status(200).send(data.expenses);
      } catch (err) {
        console.log("ERROR AXIOS REQUEST", err);
        return res.send(err);
      }
    }
  }

  if (req.method === "POST") {
    const { name, email } = req.body;

    try {
      const requestBody = {
        query: gql`
          mutation CreateExpense($name: String!, $email: String!) {
            createExpense(
              data: {
                name: $name
                persons: { connect: { Person: { email: $email } } }
              }
            ) {
              id
            }
          }
        `,
        variables: { name, email },
      };

      const response = await instances.post("", requestBody);
      const { data } = response.data;

      return res.status(200).send(data.createExpense);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }

  return res.send({
    message: "REQUEST IS NOT DEFINED",
    method: req.method,
  });
}
