import * as yup from "yup";
import handleError from "@helpers/handleError";
import { ShoppingType } from "@interfaces/*";
import { NextApiRequest, NextApiResponse } from "next";
import updateInstitutionTotals from "../institution/updateInstitutionTotals";
import { shoppingSchema } from ".";

interface UpdateShoppingType {
  id?: string;
  description?: string;
  amount?: string;
  category?: string;
  paymentStatus?: string;
  shoppings?: ShoppingType[];
}

async function updateShopping(req: NextApiRequest, res: NextApiResponse) {
  const { id, description, amount, category, paymentStatus, shoppings } =
    req.body as UpdateShoppingType;

  const shoppingsSchema = yup.object().shape({
    shoppings: yup.array().of(shoppingSchema).required(),
  });

  if (id) {
    try {
      await shoppingSchema.validate(req.body, { abortEarly: false });

      const newShopping = await prisma.shopping.update({
        where: {
          id,
        },

        data: {
          description,
          amount,
          category,
          paymentStatus,
        },
      });

      await updateInstitutionTotals(newShopping.institutionId);

      return res.status(200).send(newShopping);
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }

  if (shoppings) {
    try {
      await shoppingsSchema.validate(req.body, { abortEarly: false });

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
                category: shopping.category,
                paymentStatus: shopping.paymentStatus,
              },
            });
          })
        );

        return res.status(200).send("ok");
      } catch (err) {
        return handleError(res, err);
      }
    } catch (err) {
      return handleError(res, err);
    }
  }

  return res.status(400).json({
    error: "Missing 'id' or 'shopping list' in the request query.",
  });
}

export default updateShopping;
