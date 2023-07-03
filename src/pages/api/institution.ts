import { NextApiRequest, NextApiResponse } from "next";

interface DeleteInstitutionType {
  institutionId: string;
}

interface GetInstitutionType {
  expenseId?: string;
  institutionName?: string;
  id?: string;
}

async function getInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, institutionName, id } =
    req.query as unknown as GetInstitutionType;

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
  const { expenseId, name } = req.body;

  try {
    const institution = await prisma.institution.create({
      data: {
        name,
        expenseId,
      },
    });

    return res.status(200).send(institution);
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
