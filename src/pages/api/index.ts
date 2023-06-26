import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const prisma = new PrismaClient();

    const months = await prisma.month.findMany({
      include: {
        institutions: {
          include: {
            shoppings: true,
          },
        },
      },
    });

    return res.send({
      hello: "Hello api!",
      months,
    });
  }
}
