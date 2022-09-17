import { hygraph, gql } from "../HygraphClient";

const GET_INSTITUTION = gql`
  query GetInstitution($id: ID!) {
    institution(where: { id: $id }) {
      id
    }
  }
`;

export const getInstitution = async (id: string) => {
  const { institution } = await hygraph.request(GET_INSTITUTION, {
    id,
  });

  return {
    ...institution,
  };
};
