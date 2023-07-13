import * as yup from "yup";

type TypeSchemaCreate = {
  description?: string;
  amount?: string;
  category?: string | undefined;
};

type TypeSchemaFilter = {
  description?: string;
  category?: string | undefined;
};

export const schemaCreate: yup.SchemaOf<TypeSchemaCreate> = yup.object().shape({
  description: yup.string(),
  amount: yup.string(),
  category: yup
    .string()
    .matches(/[a-z]+/, "Somente letras minúsculas são permitidas"),
});

export const schemaFilter: yup.SchemaOf<TypeSchemaFilter> = yup.object().shape({
  description: yup.string(),
  category: yup
    .string()
    .matches(/[a-z]+/, "Somente letras minúsculas são permitidas"),
});
