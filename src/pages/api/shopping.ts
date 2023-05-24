import { NextApiRequest, NextApiResponse } from "next";

import instances from "src/lib/axios-instance";
import { CREATE_SHOPPING } from "./graphql/shopping";

async function createShopping(req: NextApiRequest, res: NextApiResponse) {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await createShopping(req, res);
      break;

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
