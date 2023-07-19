import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface GetInstitutionType {
  expenseId: string;
  createAt: string;
  institutionName?: string;
  id?: string;
}

async function getInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, institutionName, id, createAt } =
    req.query as unknown as GetInstitutionType;

  if (institutionName && createAt && expenseId) {
    try {
      const institution = await prisma.institution.findFirst({
        where: {
          name: institutionName,
          createAt,
          expenseId,
        },
        include: {
          shoppings: {
            orderBy: {
              createAt: "desc",
            },
          },
        },
      });

      return res.status(200).send(institution);
    } catch (err) {
      handleError(res, err);
    }
  }

  if (createAt && expenseId) {
    try {
      const institutions = await prisma.institution.findMany({
        where: {
          createAt,
          expenseId,
        },
        include: {
          shoppings: {
            orderBy: {
              createAt: "desc",
            },
          },
        },
      });
      return res.status(200).send(institutions);
    } catch (err) {
      handleError(res, err);
    }
  }

  if (id) {
    try {
      const institution = await prisma.institution.findUnique({
        where: {
          id,
        },

        include: {
          shoppings: {
            orderBy: {
              createAt: "desc",
            },
          },
        },
      });

      return res.status(200).send(institution);
    } catch (err) {
      return handleError(res, err);
    }
  }

  return res.status(400).json({
    error: "Missing 'createAt' or 'expenseId' or 'id' in the request query.",
  });
}

export default getInstitution;
