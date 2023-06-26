import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const {
      responsible,
      reference,
      description,
      amount,
      paymentStatus,
      institutionReference,
    } = req.body;

    const newShopping = await prisma.shopping.create({
      data: {
        responsible,
        reference,
        description,
        amount,
        paymentStatus,
      },
    });

    try {
      await prisma.institution.update({
        where: {
          reference: institutionReference,
        },
        data: {
          shoppings: {
            connect: {
              id: newShopping.id,
            },
          },
        },
      });

      return res.send(newShopping);
    } catch (error) {
      console.log("error axios request mongodb", error);
      return res.send(error);
    }
  }

  if (req.method === "DELETE") {
    const { reference }: any = req.query;

    try {
      await prisma.shopping.delete({
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

  if (req.method === "PUT") {
    const { id, reference, description, responsible, amount, paymentStatus } =
      req.body;

    try {
      const shoppingUpdate = await prisma.shopping.update({
        where: {
          reference: reference,
        },
        data: {
          reference,
          description,
          responsible,
          amount,
          paymentStatus,
        },
      });

      return res.send(shoppingUpdate);
    } catch (error) {
      console.log("Error axios request mongodb");
      return res.send(error);
    }
  }
}
