import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const prisma = new PrismaClient();
      const response = await prisma.month.findMany();

      return res.send(response);
    } catch (error) {
      return res.send(error);
    }
  }
}
