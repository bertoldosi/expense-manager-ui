import { InstitutionType } from "@interfaces/*";
import instances from "src/lib/axios-instance-bff";

interface NewInstitutionType extends InstitutionType {
  expenseId: string;
}

export const createInstitution = async (institution: NewInstitutionType) => {
  return instances.post("/institution", institution);
};