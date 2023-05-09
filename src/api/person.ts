import { UserType } from "@interfaces/*";
import instancesBff from "src/lib/axios-instance-bff";

export const createPerson = async (user: UserType) => {
  return instancesBff.post("/person", user);
};

export const getPerson = async (email: string) => {
  return instancesBff.get("/person", {
    params: {
      email,
    },
  });
};
