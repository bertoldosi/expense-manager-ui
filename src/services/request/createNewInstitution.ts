import { InstitutionType } from "../../components/container/HomeContainer/types";
import { hygraph, gql } from "../HygraphClient";

const CREATE_INSTITUTION = gql`
  mutation CreateInstitution($name: String!, $expirationDate: Date!) {
    createInstitution(data: { name: $name, expirationDate: $expirationDate }) {
      id
    }
  }
`;

export const createNewInstitution = async (institution: InstitutionType) => {
  const { createInstitution } = await hygraph.request(
    CREATE_INSTITUTION,
    institution
  );

  return {
    ...createInstitution,
  };
};
