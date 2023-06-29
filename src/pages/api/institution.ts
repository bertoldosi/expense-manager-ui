import { NextApiRequest, NextApiResponse } from "next";

async function getInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, institutionName, id } = req.query;

  if (institutionName) {
    try {
      return res.status(200).send({});
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }

  if (id) {
    try {
      return res.status(200).send({});
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

async function createInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, name } = req.body;

  try {
    return res.status(200).send({});
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
      await createInstitution(req, res);
      break;

    case "GET":
      await getInstitution(req, res);
      break;

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
