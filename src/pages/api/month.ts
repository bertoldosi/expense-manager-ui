import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    const { monthNumber } = req.query;

    if (monthNumber) {
      try {
        const month = await prisma.month.findUnique({
          where: {
            monthNumber: Number(monthNumber),
          },

          include: {
            institutions: true,
          },
        });

        return res.send(month);
      } catch (error) {
        console.log("Error axios request mongodb", error);
        return res.send(error);
      }
    } else {
      try {
        const months = await prisma.month.findMany({
          include: {
            institutions: {
              include: {
                shoppings: true,
              },
            },
          },
        });

        return res.send(months);
      } catch (error) {
        console.log("Error axios request mongodb", error);
        return res.send(error);
      }
    }
  }

  if (req.method === "PUT") {
    const { monthIdNextMonth, institutionReference } = req.body;

    try {
      const month = await prisma.month.update({
        where: {
          id: monthIdNextMonth,
        },

        data: {
          institutions: {
            connect: {
              reference: institutionReference,
            },
          },
        },
      });

      return res.send(month);
    } catch (error) {
      console.log("Error axios request mongodb", error);
      return res.send(error);
    }
  }
}
