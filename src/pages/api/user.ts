import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@services/prisma";

interface GetUserEmailType {
  email: string;
}

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query as unknown as GetUserEmailType;

  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          expenses: {
            include: {
              institutions: {
                include: {
                  shoppings: {
                    orderBy: {
                      createAt: "desc",
                    },
                  },
                },
              },
            },
          },
        },
      });

      return res.status(200).send(user);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await getUser(req, res);
      break;

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
