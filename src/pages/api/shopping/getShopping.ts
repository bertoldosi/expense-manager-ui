import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface GetShoppingType {
  category: string;
  institutionId: string;
}

async function getShopping(req: NextApiRequest, res: NextApiResponse) {
  const { category, institutionId } = req.query as any as GetShoppingType;

  if (category === "all") {
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
        category,
        institutionId,
      },
    });

    return res.status(200).send(shoppings);
  } catch (err) {
    return handleError(res, err);
  }
}

export default getShopping;
