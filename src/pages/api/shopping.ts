import { ShoppingType } from "@interfaces/*";
import { NextApiRequest, NextApiResponse } from "next";

interface CreateShoppingType {
  shopping: ShoppingType;
  institutionId: string;
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await createShopping(req, res);
      break;

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
