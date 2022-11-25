import * as yup from "yup";

type TypeSchema = {
  description: string;
  amount: string;
  responsible: string;
};

const REQUIRED_FIELD = "O campo não pode ser vazio";

const schema: yup.SchemaOf<TypeSchema> = yup.object().shape({
  description: yup.string().required(REQUIRED_FIELD),
  amount: yup.string().required(REQUIRED_FIELD),
  responsible: yup.string().required(REQUIRED_FIELD),
});

export default schema;
