import * as yup from "yup";

const REQUIRED_FIELD = "O campo não pode ser vazio";

export default yup.object().shape({
  description: yup.string().required(REQUIRED_FIELD),
  amount: yup.string().required(REQUIRED_FIELD),
  responsible: yup.string().required(REQUIRED_FIELD),
});
