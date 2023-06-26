import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const response = await prisma.institution.findMany();

      return res.send(response);
    } catch (error) {
      console.log("Error axios request mongodb");
      return res.send(error);
    }
  }

  if (req.method === "POST") {
    const { reference, name, amount, expirationDate, monthId }: any = req.body;

    try {
      const newInstitution = await prisma.institution.create({
        data: {
          name,
          reference,
          amount: String(amount),
          expirationDate,
        },
      });

      await prisma.month.update({
        where: {
          id: monthId,
        },
        data: {
          institutions: {
            connect: {
              id: newInstitution.id,
            },
          },
        },
      });

      return res.send(newInstitution);
    } catch (error) {
      console.log("error axios request mongodb", error);
      return res.send(error);
    }
  }

  if (req.method === "DELETE") {
    const { id }: any = req.query;

    try {
      await prisma.institution.delete({
        where: {
          id,
        },
      });

      return res.status(204).send("Ok");
    } catch (error) {
      console.log("Error axios request mongodb");
      return res.send(error);
    }
  }
}
