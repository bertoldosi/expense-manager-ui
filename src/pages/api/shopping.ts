import { NextApiRequest, NextApiResponse } from "next";
import instances from "src/lib/axios-instance";
import { CREATE_SHOPPING } from "./graphql/shopping";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { institutionId, shopping } = req.body;

    try {
      const requestBody = {
        query: CREATE_SHOPPING,
        variables: {
          institutionId,
          shopping: [shopping],
        },
      };

      const response = await instances.post("", requestBody);
      const { data } = response.data;

      return res.status(200).send(data.updateInstitution);
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
