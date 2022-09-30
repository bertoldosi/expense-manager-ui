import { InstitutionType } from "@containers/Home/types";

export const removingInstitution = (
  institutions: InstitutionType[],
  institutionReference: string
) => {
  const resultFilter = institutions.filter((institution) => {
    return institution.reference != institutionReference;
  });

  return resultFilter;
};
