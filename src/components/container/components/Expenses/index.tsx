import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { Add } from "@icons/Add";
import { Table } from "@containers/components/Table";

import { updateInstitutionShoppings } from "@graphqls/institution";
import { focusInput } from "@helpers/focusInput";
import { maskMorney } from "@helpers/masks";
import validationSchema from "./validations";
import { Error } from "@commons/Error";

import { Scontent, Sheader } from "./styles";

import { InstitutionType, MonthType } from "../../Home/types";
import { customToast } from "@helpers/customToast";
import { useFormik } from "formik";
import { UserContext, UserContextType } from "src/context/userContext";

type PropsType = {
  institution: InstitutionType;
  month: MonthType;
};

const initialValues = {
  reference: uuidv4(),
  description: "",
  amount: "",
  responsible: "",
  select: false,
  status_paid: "aberto",
};

export const Expenses = ({ institution, month }: PropsType) => {
  const { getMonths } = React.useContext(UserContext) as UserContextType;

  const [request, setRequest] = React.useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        reference: uuidv4(),
      };

      updateInstitutionShoppings(institution.reference, [payload])
        .then(() => {
          getMonths();
          customToast("success", "Adicionado com sucesso!");
        })

        .catch(() => {
          customToast("error", "Tente novamente!");
        })

        .finally(() => {
          formik.resetForm();
          setRequest(false);
          focusInput("description");
        });
    },

    validationSchema,
  });

  const handleAmountChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const amount = maskMorney(value, name);

    formik.setFieldValue("amount", amount);
  };

  return (
    <Scontent>
      <Sheader onSubmit={formik.handleSubmit}>
        <Input
          autoFocus
          name="description"
          placeholder="Descrição do item"
          id={formik.values.reference}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && (
              <Error>{formik.errors.description}</Error>
            )
          }
        />
        <Input
          disabled={request}
          name="amount"
          placeholder="R$ 00,00"
          id={formik.values.reference}
          value={formik.values.amount}
          onChange={handleAmountChange}
          error={formik.touched.amount && <Error>{formik.errors.amount}</Error>}
        />
        <Input
          disabled={request}
          name="responsible"
          placeholder="Nome do responsavel"
          id={formik.values.reference}
          value={formik.values.responsible}
          onChange={formik.handleChange}
          error={
            formik.touched.responsible && (
              <Error>{formik.errors.responsible}</Error>
            )
          }
        />
        <Button
          disabled={request}
          color="#fff"
          background="#B0C4DE"
          icon={<Add width={15} height={15} />}
          type="submit"
        >
          Adicionar
        </Button>
      </Sheader>
      <Table
        institution={institution}
        month={month}
        request={request}
        setRequest={setRequest}
      />
    </Scontent>
  );
};
