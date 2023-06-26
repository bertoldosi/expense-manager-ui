import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

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

    const newInstitution = await prisma.institution.create({
      data: {
        name,
        reference,
        amount,
        expirationDate,
      },
    });

    try {
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
    const { reference }: any = req.query;

    try {
      await prisma.institution.delete({
        where: {
          reference,
        },
      });

      return res.status(204).send("Ok");
    } catch (error) {
      console.log("Error axios request mongodb");
      return res.send(error);
    }
  }
}
