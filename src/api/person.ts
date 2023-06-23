import instancesInternal from "src/lib/axios-instance-internal";
import { UserType } from "@interfaces/*";

export const createPerson = async (user: UserType) => {
  return await instancesInternal.post("/person", user);
};

export const getPerson = async (email: string) => {
  return await instancesInternal.get("/person", {
    params: {
      email,
    },
  });
};
