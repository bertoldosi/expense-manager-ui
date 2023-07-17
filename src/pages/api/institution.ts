import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
interface CreateInstitutionType {
  expenseId: string;
  name: string;
  createAt: string;
}
interface GetInstitutionType {
  expenseId: string;
  createAt: string;
  institutionName?: string;
  id?: string;
}
interface DeleteInstitutionType {
  institutionId: string;
}

async function createInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, name, createAt } = req.body as CreateInstitutionType;

  const nameUPCASE = name.toUpperCase();

  const schema = yup.object().shape({
    expenseId: yup.string().required(),
    name: yup.string().required(),
    createAt: yup
      .string()
      .required("Date of create is required")
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Invalid date format. Use DD/MM/YYYY."),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });

    const institutionExists = await prisma.$transaction(async (prisma) => {
      const existingInstitution = await prisma.institution.findFirst({
        where: {
          expenseId,
          name: nameUPCASE,
          createAt,
        },
      });

      return existingInstitution;
    });

    if (institutionExists) {
      return res
        .status(405)
        .send("Not allowed. Name already registered in this period!");
    }

    const institution = await prisma.institution.create({
      data: {
        name: nameUPCASE,
        expenseId,
        createAt,
      },
    });

    return res.status(200).json(institution);
  } catch (err) {
    return handleError(res, err);
  }
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

async function deleteInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId } = req.query as unknown as DeleteInstitutionType;

  try {
    const deleteShoppings = prisma.shopping.deleteMany({
      where: {
        institutionId,
      },
    });

    const deleteInstitution = prisma.institution.delete({
      where: {
        id: institutionId,
      },
    });

    const transaction = await prisma.$transaction([
      deleteShoppings,
      deleteInstitution,
    ]);

    return res.send(transaction);
  } catch (err) {
    return handleError(res, err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.GET:
      await getInstitution(req, res);
      break;

    case HttpMethod.POST:
      await createInstitution(req, res);
      break;

    case HttpMethod.DELETE:
      await deleteInstitution(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}
