import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@services/prisma";
import handleError from "@helpers/handleError";

interface GetUserType {
  email: string;
}

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query as unknown as GetUserType;

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
      handleError(res, err);
    }
  }

  return res.status(400).json({
    error: "Missing 'email' in the request query.",
  });
}

export default getUser;
