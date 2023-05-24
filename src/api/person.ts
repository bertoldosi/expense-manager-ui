import { UserType } from "@interfaces/*";
import instancesInternal from "src/lib/axios-instance-internal";

export const createPerson = async (user: UserType) => {
  return instancesInternal.post("/person", user);
};

export const getPerson = async (email: string) => {
  return instancesInternal.get("/person", {
    params: {
      email,
    },
  });
};
