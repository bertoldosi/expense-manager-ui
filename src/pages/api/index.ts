import { NextApiRequest, NextApiResponse } from "next";

export default async function handles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.send("Hello api!");
  }
}
