import * as yup from "yup";

type TypeSchema = {
  name: string;
  expirationDate: string;
};

const REQUIRED_FIELD = "O campo não pode ser vazio";

export const schema: yup.SchemaOf<TypeSchema> = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD),
  expirationDate: yup.string().required(REQUIRED_FIELD),
});

export default schema;
