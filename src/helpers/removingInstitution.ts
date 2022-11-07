import { InstitutionType } from "@interfaces/*";

export const removingInstitution = (
  institutions: InstitutionType[],
  institutionReference: string
) => {
  const resultFilter = institutions.filter((institution) => {
    return institution.reference != institutionReference;
  });

  return resultFilter;
};
