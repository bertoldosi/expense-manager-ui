import { hygraph, gql } from "../services/HygraphClient";

const UPDATE_MONTH = gql`
  mutation UpdateMonth($institutionReference: String!, $monthId: ID!) {
    updateMonth(
      data: {
        institutions: {
          connect: { where: { reference: $institutionReference } }
        }
      }
      where: { id: $monthId }
    ) {
      id
    }
  }
`;

export const updateMonthInstitution = async (
  monthId: string,
  institutionReference: string
) => {
  const { updateMonth } = await hygraph
    .request(UPDATE_MONTH, {
      institutionReference,
      monthId,
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    ...updateMonth,
  };
};
