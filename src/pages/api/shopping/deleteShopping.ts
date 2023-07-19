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
  const { id } = req.query as unknown as DeleteShoppingType;
  const { shoppings } = req.body as unknown as DeleteShoppingsType;

  try {
    await prisma.$transaction(async (prisma) => {
      if (id) {
        const shoppingDelete = await prisma.shopping.delete({
          where: {
            id,
          },
        });

        const institution = await prisma.institution.findUnique({
          where: {
            id: shoppingDelete.institutionId,
          },
          include: {
            expense: true,
          },
        });

        if (institution?.id) {
          await updateInstitutionTotals(institution.id);
        }

        if (institution?.expenseId) {
          await updateExpenseTotals(institution.expenseId);
        }
      }

      if (shoppings) {
        const institutionId = shoppings[0].institutionId;

        const shoppingIds = shoppings.map((shopping) => shopping.id);
        await prisma.shopping.deleteMany({
          where: {
            id: {
              in: shoppingIds,
            },
          },
        });

        const institution = await prisma.institution.findUnique({
          where: {
            id: institutionId,
          },
        });

        if (institutionId) {
          await updateInstitutionTotals(institutionId);
        }

        if (institution?.expenseId) {
          await updateExpenseTotals(institution.expenseId);
        }
      }
    });

    return res.status(200).send("ok");
  } catch (err) {
    handleError(res, err);
  }
}

export default deleteShopping;
