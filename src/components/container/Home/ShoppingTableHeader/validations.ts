import * as yup from "yup";

type TypeSchema = {
  description?: string;
  amount?: string;
  responsible?: string | undefined;
};

const schema: yup.SchemaOf<TypeSchema> = yup.object().shape({
  description: yup.string(),
  amount: yup.string(),
  responsible: yup
    .string()
    .matches(/[a-z]+/, "Somente letras minúsculas são permitidas"),
});

export default schema;
