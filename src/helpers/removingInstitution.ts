import { InstitutionType } from "@interfaces/*";

export const removingInstitution = (
  institutions: InstitutionType[],
  institutionId: string
) => {
  const resultFilter = institutions.filter((institution) => {
    return institution.id != institutionId;
  });

  return resultFilter;
};
