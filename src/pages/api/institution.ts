import { NextApiRequest, NextApiResponse } from "next";

interface DeleteInstitutionType {
  institutionId: string;
}

interface GetInstitutionType {
  expenseId: string;
  createAt: string;
  institutionName?: string;
  id?: string;
}

async function getInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, institutionName, id, createAt } =
    req.query as unknown as GetInstitutionType;

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
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }

  if (institutionName) {
    try {
      return res.status(200).send({});
    } catch (err) {
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
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
      console.log("ERROR AXIOS REQUEST", err);
      return res.send(err);
    }
  }

  return res.send({
    message: "REQUEST IS NOT DEFINED",
    method: req.method,
  });
}

async function createInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, name, createAt } = req.body;

  try {
    const nameUPCASE = name.toUpperCase();

    const isInstitutionExist = await prisma.institution.findFirst({
      where: {
        expenseId,
        name: nameUPCASE,
        createAt,
      },
    });

    if (isInstitutionExist) {
      return res
        .status(405)
        .send("Not allowed. Name already registered in this period!");
    } else {
      const institution = await prisma.institution.create({
        data: {
          name: nameUPCASE,
          expenseId,
          createAt,
        },
      });

      return res.status(200).send(institution);
    }
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return res.send(err);
  }
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
      await createInstitution(req, res);
      break;

    case "GET":
      await getInstitution(req, res);
      break;

    case "DELETE":
      await deleteInstitution(req, res);
      break;

    default:
      return res.send({
        message: "REQUEST IS NOT DEFINED",
        method: req.method,
      });
  }
}
