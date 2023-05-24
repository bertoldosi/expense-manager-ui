import { NextApiRequest, NextApiResponse } from "next";
import instances from "src/lib/axios-instance";
import { CREATE_INSTITUTION } from "./graphql/institution";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { expenseId, name } = req.body;

    try {
      const requestBody = {
        query: CREATE_INSTITUTION,
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
