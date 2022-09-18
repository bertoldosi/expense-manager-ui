import { InstitutionType } from "../../components/container/HomeContainer/types";
import { hygraph, gql } from "../HygraphClient";

const CREATE_INSTITUTION = gql`
  mutation CreateInstitution(
    $name: String!
    $reference: String!
    $expirationDate: Date!
  ) {
    createInstitution(
      data: {
        reference: $reference
        name: $name
        expirationDate: $expirationDate
      }
    ) {
      reference
    }
  }
`;

const PUBLISH_INSTITUTION = gql`
  mutation PublishInstitution($reference: String!) {
    publishInstitution(where: { reference: $reference }, to: PUBLISHED) {
      reference
    }
  }
`;

const UPDATE_MONTH = gql`
  mutation UpdateMonth($institutionReference: ID!, $monthId: ID!) {
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

const PUBLISH_MONTH = gql`
  mutation PublishMonth($id: ID!) {
    publishMonth(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export const createInstitution = async (
  inputInstitution: InstitutionType,
  monthId: string
) => {
  const { createInstitution } = await hygraph.request(
    CREATE_INSTITUTION,
    inputInstitution
  );

  hygraph.request(PUBLISH_INSTITUTION, {
    reference: createInstitution.reference,
  });

  const { updateMonth } = await hygraph.request(UPDATE_MONTH, {
    institutionReference: createInstitution.reference,
    monthId,
  });

  hygraph.request(PUBLISH_MONTH, {
    id: updateMonth.id,
  });

  return {
    ...createInstitution,
  };
};
