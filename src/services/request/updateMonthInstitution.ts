import { hygraph, gql } from "../HygraphClient";

const UPDATE_INSTITUTION_MONTH = gql`
  mutation UpdateMonth($institutionId: ID!, $monthId: ID!) {
    updateMonth(
      data: { institutions: { connect: { where: { id: $institutionId } } } }
      where: { id: $monthId }
    ) {
      id
    }
  }
`;

export const updateMonthInstitution = async (
  monthId: string,
  institutionId: string
) => {
  const { updateMonth } = await hygraph.request(UPDATE_INSTITUTION_MONTH, {
    monthId,
    institutionId,
  });

  return {
    ...updateMonth,
  };
};
