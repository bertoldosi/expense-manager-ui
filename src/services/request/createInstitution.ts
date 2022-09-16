import { InstitutionType } from "../../components/container/HomeContainer/types";
import { hygraph, gql } from "../HygraphClient";

const CREATE_INSTITUTION = gql`
  mutation CreateInstitution($name: String!, $expirationDate: Date!) {
    createInstitution(data: { name: $name, expirationDate: $expirationDate }) {
      id
    }
  }
`;

const PUBLISH_INSTITUTION = gql`
  mutation PublishInstitution($id: ID!) {
    publishInstitution(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

const UPDATE_MONTH = gql`
  mutation UpdateMonth($institutionId: ID!, $monthId: ID!) {
    updateMonth(
      data: { institutions: { connect: { where: { id: $institutionId } } } }
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
    id: createInstitution.id,
  });

  const { updateMonth } = await hygraph.request(UPDATE_MONTH, {
    institutionId: createInstitution.id,
    monthId,
  });

  hygraph.request(PUBLISH_MONTH, {
    id: updateMonth.id,
  });
};
