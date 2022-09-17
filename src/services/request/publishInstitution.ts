import { hygraph, gql } from "../HygraphClient";

const PUBLISH_INSTITUTION = gql`
  mutation PublishInstitution($id: ID!) {
    publishInstitution(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export const publishInstitution = async (id: string) => {
  const { publishInstitution } = await hygraph.request(PUBLISH_INSTITUTION, {
    id,
  });

  return {
    ...publishInstitution,
  };
};
