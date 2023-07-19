import handleError from "@helpers/handleError";
import { ShoppingType } from "@interfaces/*";
import { NextApiRequest, NextApiResponse } from "next";
import updateInstitutionTotals from "../institution/updateInstitutionTotals";
import updateExpenseTotals from "../expense/updateExpenseTotals";

interface DeleteShoppingType {
  id: string;
  shoppings: ShoppingType[];
}

interface DeleteShoppingsType {
  shoppings: ShoppingType[];
}

async function deleteShopping(req: NextApiRequest, res: NextApiResponse) {
  const { shoppings } = req.body as unknown as DeleteShoppingsType;

  try {
    await prisma.$transaction(async (prisma) => {
      if (shoppings) {
        const shoppingIds = shoppings.map((shopping) => shopping.id);
        await prisma.shopping.deleteMany({
          where: {
            id: {
              in: shoppingIds,
            },
          },
        });
      }
    });

    const institutionId = shoppings[0].institutionId;
    const institution = await prisma.institution.findUnique({
      where: {
        id: institutionId,
      },
    });

    if (!institution) {
      throw new Error("Institution not found");
    }

    await updateInstitutionTotals(institutionId!!);
    await updateExpenseTotals(institution!!.expenseId!!);

    return res.status(200).send("ok");
  } catch (err) {
    handleError(res, err);
  }
}

export default deleteShopping;
