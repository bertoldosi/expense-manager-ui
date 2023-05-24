import { gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";
import instances from "src/lib/axios-instance";
import { CREATE_EXPENSE, GET_EXPENSE, GET_EXPENSES } from "./graphql/expense";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (id) {
      try {
        const requestBody = {
          query: GET_EXPENSE,
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
          query: GET_EXPENSES,
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
        query: CREATE_EXPENSE,
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
