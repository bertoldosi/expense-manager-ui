import { UserType } from "@interfaces/*";
import instancesInternal from "src/lib/axios-instance-internal";
import prisma from "../services/prisma";

export const createPerson = async (user: UserType) => {
  await prisma.user.create({
    data: {
      ...user,
    },
  });

  return instancesInternal.post("/person", user);
};

export const getPerson = async (email: string) => {
  return instancesInternal.get("/person", {
    params: {
      email,
    },
  });
};
