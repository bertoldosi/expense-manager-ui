import { InstitutionType } from "@interfaces/*";
import instances from "src/lib/axios-instance-internal";

interface NewInstitutionType extends InstitutionType {
  expenseId: string;
}

export const createInstitution = async (institution: NewInstitutionType) => {
  return instances.post("/institution", institution);
};

export const getInstitution = async (id: string) => {
  return instances.get("/institution", {
    params: {
      id,
    },
  });
};

export const getInstitutionsForName = async (
  expenseId: string,
  institutionName: string
) => {
  return instances.get("/institution", {
    params: {
      expenseId,
      institutionName,
    },
  });
};
