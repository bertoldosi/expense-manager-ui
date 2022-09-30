import { InstitutionType } from "../components/containers/HomeContainer/types";

export const removingInstitution = (
  institutions: InstitutionType[],
  institutionReference: string
) => {
  const resultFilter = institutions.filter((institution) => {
    return institution.reference != institutionReference;
  });

  return resultFilter;
};
