import calculateCategoryTotals from "@helpers/calculateCategoryTotals";
import calculateTotalAmountInstitution from "@helpers/calculateTotalAmountInstitution";
import handleError from "@helpers/handleError";
import { InstitutionType, ShoppingType } from "@interfaces/*";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
interface CreateShoppingType {
  shopping: ShoppingType;
  institutionId: string;
}
interface UpdateShoppingType {
  id?: string;
  description?: string;
  amount?: string;
  category?: string;
  paymentStatus?: string;
  shoppings?: ShoppingType[];
}
interface GetShoppingType {
  category: string;
  institutionId: string;
}
interface DeleteShoppingType {
  id: string;
  shoppings: ShoppingType[];
}
interface DeleteShoppingsType {
  shoppings: ShoppingType[];
}

const shoppingSchema = yup.object().shape({
  description: yup.string().required(),
  amount: yup.string().required(),
  category: yup.string().required(),
  paymentStatus: yup
    .string()
    .required()
    .oneOf(["open", "closed"], "Payment status must be 'open' or 'closed'"),
});

async function updateInstitutionTotals(institutionId: string) {
  const institution = await prisma.institution.findUnique({
    where: {
      id: institutionId,
    },
    include: {
      shoppings: true,
    },
  });

  if (!institution) {
    throw new Error("Institution not found");
  }

  const totalAmount = calculateTotalAmountInstitution(institution);
  const categoryTotals = calculateCategoryTotals(institution);

  try {
    await prisma.institution.update({
      where: {
        id: institutionId,
      },
      data: {
        totalAmount,
        categoryTotals: categoryTotals,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function createShopping(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId, shopping } = req.body as unknown as CreateShoppingType;

  try {
    await shoppingSchema.validate(shopping, { abortEarly: false });

    const newShopping = await prisma.shopping.create({
      data: {
        ...shopping,
        institutionId,
      },
    });

    await updateInstitutionTotals(newShopping.institutionId);

    return res.status(200).send(newShopping);
  } catch (err) {
    return handleError(res, err);
  }
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

async function deleteShopping(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as unknown as DeleteShoppingType;
  const { shoppings } = req.body as unknown as DeleteShoppingsType;

  try {
    await prisma.$transaction(async (prisma) => {
      if (id) {
        await prisma.shopping.delete({
          where: {
            id,
          },
        });
      }

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

    return res.status(200).send("ok");
  } catch (err) {
    handleError(res, err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.GET:
      await getShopping(req, res);
      break;

    case HttpMethod.POST:
      await createShopping(req, res);
      break;

    case HttpMethod.PUT:
      await updateShopping(req, res);
      break;

    case HttpMethod.DELETE:
      await deleteShopping(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}
