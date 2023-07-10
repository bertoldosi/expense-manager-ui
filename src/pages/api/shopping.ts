import { ShoppingType } from "@interfaces/*";
import { NextApiRequest, NextApiResponse } from "next";

interface CreateShoppingType {
  shopping: ShoppingType;
  institutionId: string;
}

interface GetShoppingType {
  responsible?: string;
  institutionId?: string;
}

interface DeleteShoppingType {
  id: string;
  shoppings: ShoppingType[];
}

interface DeleteShoppingsType {
  shoppings: ShoppingType[];
}

async function createShopping(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId, shopping } = req.body as unknown as CreateShoppingType;

  try {
    const newShopping = await prisma.shopping.create({
      data: {
        ...shopping,
        institutionId,
      },
    });

    return res.status(200).send(newShopping);
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return res.send(err);
  }
}

async function getShopping(req: NextApiRequest, res: NextApiResponse) {
  const { responsible, institutionId } = req.query as any as GetShoppingType;

  if (responsible === "Todos") {
    try {
      const shoppings = await prisma.shopping.findMany({
        where: {
          institutionId,
        },
      });

      return res.status(200).send(shoppings);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }

  try {
    const shoppings = await prisma.shopping.findMany({
      where: {
        responsible,
        institutionId,
      },
    });

    return res.status(200).send(shoppings);
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return res.send(err);
  }
}

async function updateShopping(req: NextApiRequest, res: NextApiResponse) {
  const { id, description, amount, responsible, paymentStatus, shoppings } =
    req.body;

  if (id) {
    try {
      const newShopping = await prisma.shopping.update({
        where: {
          id,
        },

        data: {
          description,
          amount,
          responsible,
          paymentStatus,
        },
      });

      return res.status(200).send(newShopping);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }

  if (shoppings) {
    try {
      try {
        await prisma.$transaction(
          shoppings.map((shopping: ShoppingType) => {
            return prisma.shopping.update({
              where: {
                id: shopping.id,
              },
              data: {
                description: shopping.description,
                amount: shopping.amount,
                responsible: shopping.responsible,
                paymentStatus: shopping.paymentStatus,
              },
            });
          })
        );

        return res.status(200).send("ok");
      } catch (err) {
        console.log("ERROR AXIOS REQUEST", err);
        return res.send(err);
      }
      return res.status(200).send("ok");
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }
}

async function deleteShopping(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as unknown as DeleteShoppingType;
  const { shoppings } = req.body as unknown as DeleteShoppingsType;

  if (id) {
    try {
      await prisma.shopping.delete({
        where: {
          id,
        },
      });

      return res.status(200).send("ok");
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }

  if (shoppings) {
    try {
      await prisma.shopping.deleteMany({
        where: {
          id: {
            in: shoppings.map((shopping) => shopping.id),
          },
        },
      });

      return res.status(200).send("ok");
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
    case "POST":
      await createShopping(req, res);
      break;

    case "GET":
      await getShopping(req, res);
      break;

    case "PUT":
      await updateShopping(req, res);
      break;

    case "DELETE":
      await deleteShopping(req, res);
      break;

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
