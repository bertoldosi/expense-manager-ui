import { gql } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";
import instances from "src/lib/axios-instance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { email } = req.query;

    if (email) {
      try {
        const requestBody = {
          query: gql`
            query Person($email: String!) {
              person(where: { email: $email }) {
                name
                expenses {
                  id
                  name
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
            }
          `,
          variables: {
            email,
          },
        };

        const response = await instances.post("", requestBody);
        const { data } = response.data;

        return res.status(200).send(data.person);
      } catch (err) {
        console.log("ERROR AXIOS REQUEST", err);
        return res.send(err);
      }
    } else {
      try {
        const requestBody = {
          query: gql``,
          variables: {},
        };

        const response = await instances.post("", requestBody);
        const { data } = response.data;

        return res.status(200).send(data.persons);
      } catch (err) {
        console.log("ERROR AXIOS REQUEST", err);
        return res.send(err);
      }
    }
  }

  return res.send({
    message: "REQUEST IS NOT DEFINED",
    method: req.method,
  });
}
