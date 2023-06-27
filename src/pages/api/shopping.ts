import prisma from "@services/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      responsible,
      reference,
      description,
      amount,
      paymentStatus,

      institutionId,
      shoppings,
    } = req.body;

    // create many shoppings
    if (shoppings) {
      try {
        const newInstitution = await shoppings.map(async (shopping: any) => {
          await prisma.shopping.create({
            data: {
              amount: shopping.amount,
              description: shopping.description,
              paymentStatus: shopping.paymentStatus,
              reference: shopping.reference,
              responsible: shopping.responsible,
              institutionId: institutionId,
            },
          });
        });

        return res.send(newInstitution);
      } catch (error) {
        console.log("error axios request mongodb", error);
        return res.send(error);
      }
    }

    // create shopping
    try {
      const newShopping = await prisma.shopping.create({
        data: {
          responsible,
          reference,
          description,
          amount,
          paymentStatus,
        },
      });

      await prisma.institution.update({
        where: {
          id: institutionId,
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

  if (req.method === "GET") {
    try {
      const shoppings = await prisma.shopping.findMany();

      return res.send(shoppings);
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
