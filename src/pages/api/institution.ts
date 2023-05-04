import { gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";
import instances from "src/lib/axios-instance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { expenseId, name } = req.body;

    try {
      const requestBody = {
        query: gql`
          mutation CreateInstitution($expenseId: ID, $name: String!) {
            updateExpense(
              where: { id: $expenseId }
              data: { institutions: { create: { name: $name } } }
            ) {
              id
            }
          }
        `,
        variables: {
          expenseId,
          name,
        },
      };

      const response = await instances.post("", requestBody);
      const { data } = response.data;

      return res.status(200).send(data.updateExpense);
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
