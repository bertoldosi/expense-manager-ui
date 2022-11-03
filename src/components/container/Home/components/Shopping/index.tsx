import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { Add } from "@icons/Add";
import { Table } from "@containers/Home/components/Shopping/components/Table";

import { updateInstitutionShoppings } from "@graphqls/institution";
import { focusInput } from "@helpers/focusInput";
import { maskMorney } from "@helpers/masks";
import validationSchema from "./validations";
import { Error } from "@commons/Error";

import { Scontent, Sheader } from "./styles";

import { InstitutionType, MonthType } from "../../types";
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
  payment_status: "aberto",
};

export const Shopping = ({ institution, month }: PropsType) => {
  const { getMonths, theme } = React.useContext(UserContext) as UserContextType;
  const [isRequest, setIsRequest] = React.useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setIsRequest(true);

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
          setIsRequest(false);
          focusInput("description");
        });
    },

    validationSchema,
  });

  const onChangeAmount = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const amount = maskMorney(value, name);

    formik.setFieldValue("amount", amount);
  };

  const onChangeResponsible = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const responsible = maskMorney(value, name);

    formik.setFieldValue("responsible", responsible);
  };

  return (
    <Scontent>
      <Sheader onSubmit={formik.handleSubmit}>
        <Input
          autoComplete="off"
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
          autoComplete="off"
          name="amount"
          placeholder="R$ 00,00"
          id={formik.values.reference}
          value={formik.values.amount}
          onChange={onChangeAmount}
          error={formik.touched.amount && <Error>{formik.errors.amount}</Error>}
        />
        <Input
          autoComplete="off"
          name="responsible"
          placeholder="Nome do responsavel"
          id={formik.values.reference}
          value={formik.values.responsible}
          onChange={onChangeResponsible}
          error={
            formik.touched.responsible && (
              <Error>{formik.errors.responsible}</Error>
            )
          }
        />
        <Button
          disabled={isRequest}
          color="#fff"
          background={theme.backgroundButton}
          icon={<Add width={15} height={15} />}
          type="submit"
        >
          Adicionar
        </Button>
      </Sheader>
      <Table institution={institution} month={month} />
    </Scontent>
  );
};
