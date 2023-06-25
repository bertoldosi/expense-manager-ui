import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    try {
      const months = await prisma.month.findMany({
        include: {
          institutions: true,
        },
      });

      return res.send(months);
    } catch (error) {
      console.log("Error axios request mongodb", error);
      return res.send(error);
    }
  }
}
