import * as yup from "yup";

const REQUIRED_FIELD = "O campo não pode ser vazio";

export default yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD),
  expirationDate: yup.string().required(REQUIRED_FIELD),
});
