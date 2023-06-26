import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;

    const month = await prisma.month.create({
      data: {
        name: body.name,
        monthNumber: body.monthNumber,
      },
    });

    try {
      body.institutions.map(async (institution: any) => {
        const newInstituiton = await prisma.institution.create({
          data: {
            name: institution.name,
            amount: institution.amount,
            expirationDate: institution.expirationDate,
            reference: institution.reference,
            monthId: month.id,
          },
        });

        institution.shoppings.map(async (shopping: any) => {
          await prisma.shopping.create({
            data: {
              amount: shopping.amount,
              description: shopping.description,
              paymentStatus: shopping.paymentStatus,
              reference: shopping.reference,
              responsible: shopping.responsible,
              institutionId: newInstituiton.id,
            },
          });
        });
      });

      return res.send({});
    } catch (error) {
      console.log("Error axios request mongodb", error);
      return res.send(error);
    }
  }
}
