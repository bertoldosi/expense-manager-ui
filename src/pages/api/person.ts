import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@services/prisma";

async function getPerson(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (email) {
    try {
      const responsePerson = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      return res.status(200).send(responsePerson);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  } else {
    try {
      const responsePersons = await prisma.user.findMany();

      return res.status(200).send(responsePersons);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }
}

async function createPerson(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body;

  try {
    const response = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });

    return res.status(200).send(response);
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
    case "GET":
      await getPerson(req, res);
      break;

    case "POST":
      await createPerson(req, res);
      break;

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
