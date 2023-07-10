import React, { useContext, useMemo, useState } from "react";
import instances from "@lib/axios-instance-internal";
import Cookies from "universal-cookie";
import { useFormik } from "formik";

import { formatedInputValue } from "@helpers/formatedInputValue";
import { customToast } from "@commons/CustomToast";
import { Button } from "@commons/Button";
import { Modal } from "@commons/Modal";
import Input from "@commons/Input";

import { InstitutionType, ShoppingType } from "@interfaces/*";
import validationSchema from "./validations";
import {
  ButtonsOptions,
  Scontent,
  ScontentModal,
  Sform,
  Slist,
  SselectingAll,
} from "./styles";
import { userContextData, userContextDataType } from "@context/userContextData";
import InputTable from "@commons/InputTable";

const INITIAL_SHOPPING = {
  description: "",
  amount: "",
  responsible: "",
  paymentStatus: "aberto",
};

function ShoppingTableHeader() {
  const { getInstitution, institution, setInstitution } = useContext(
    userContextData
  ) as userContextDataType;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [valueSelectingAllShoppings, setValueSelectingAllShoppings] =
    useState<boolean>(false);
  const [shoppingsSeleceted, setShoppingsSelected] = useState<ShoppingType[]>(
    []
  );

  function openModal() {
    setIsModalVisible(!isModalVisible);
  }

  function exitModal() {
    setIsModalVisible(!isModalVisible);
  }

  function selectingAllShoppings(ev: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = ev.target;
    setValueSelectingAllShoppings(checked);

    setInstitution((prevInstitution: InstitutionType) => ({
      ...prevInstitution,
      shoppings: prevInstitution.shoppings?.map((shoppingMap) => ({
        ...shoppingMap,
        selected: checked,
      })),
    }));
  }

  const onSubmitShopping = useFormik({
    initialValues: INITIAL_SHOPPING,
    onSubmit: async (values) => {
      const newShoppings = shoppingsSeleceted.map((shoppingMap) => {
        return {
          ...shoppingMap,
          description: values.description
            ? values.description
            : shoppingMap.description,
          amount: values.amount
            ? values.amount.replace(/,/g, "")
            : shoppingMap.amount.replace(/,/g, ""),
          responsible: values.responsible
            ? values.responsible
            : shoppingMap.responsible,
          paymentStatus: values.paymentStatus
            ? values.paymentStatus
            : shoppingMap.paymentStatus,
        };
      });

      await instances
        .put("api/shopping", {
          shoppings: newShoppings,
        })
        .then(async (response) => {
          fethInstitution();
          customToast("success", "Itens alterados com sucesso!");
          setIsModalVisible(false);
          setValueSelectingAllShoppings(false);
        })
        .catch((response) => {
          customToast("error", "Algo deu errado, tente novamente mais tarde!");
        });

      onSubmitShopping.resetForm();
    },

    validationSchema,
  });

  function deleteShoppings() {
    instances
      .delete("api/shopping", {
        data: {
          shoppings: shoppingsSeleceted,
        },
      })
      .then(() => {
        fethInstitution();
        customToast("success", "Itens excluidos com sucesso!");
        setValueSelectingAllShoppings(false);
      })
      .catch(() => {
        customToast("error", "Algo deu errado, tente novamente mais tarde!");
      });
  }

  function fethInstitution() {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    getInstitution(cookieValues?.filter?.institution?.id);
  }

  useMemo(() => {
    const shoppings = institution?.shoppings?.filter(
      (shoppingFilter) => shoppingFilter.selected
    );

    setShoppingsSelected(shoppings || []);
  }, [institution?.shoppings]);

  return (
    <>
      <Scontent>
        <SselectingAll>
          <InputTable
            id="selectingAll"
            type="checkbox"
            name="selectingAll"
            checked={valueSelectingAllShoppings}
            onChange={selectingAllShoppings}
          />
          <span>Todos</span>
        </SselectingAll>

        <ButtonsOptions>
          {shoppingsSeleceted.length ? (
            <>
              <Button
                text="Editar"
                width="30rem"
                height="2.5rem"
                onClick={openModal}
              />
              <Button
                text="Excluir"
                width="30rem"
                height="2.5rem"
                typeButton="delete"
                onClick={deleteShoppings}
              />
            </>
          ) : (
            ""
          )}
        </ButtonsOptions>
      </Scontent>

      <Modal
        title="Editando item(s)"
        isVisible={isModalVisible}
        handlerIsVisible={exitModal}
      >
        <ScontentModal>
          <Slist>
            <h2>{`Serão editados ${shoppingsSeleceted.length} itens:`}</h2>
            <ul>
              {shoppingsSeleceted.map((shoppingMap) => (
                <li>{shoppingMap.description}</li>
              ))}
            </ul>

            <p>
              Nessa edição em lote, caso queira mudar somente um campo, preencha
              o que deseja alterar e deixe os outros em branco.
            </p>
          </Slist>

          <Sform onSubmit={onSubmitShopping.handleSubmit}>
            <Input
              name="description"
              id="description"
              autoFocus
              autoComplete="off"
              placeholder="Descrição do item"
              value={onSubmitShopping.values.description}
              onChange={onSubmitShopping.handleChange}
              error={onSubmitShopping.errors.description}
            />
            <Input
              name="amount"
              id="amount"
              autoComplete="off"
              placeholder="R$ 00,00"
              value={formatedInputValue(
                onSubmitShopping.values.amount,
                "amount"
              )}
              onChange={onSubmitShopping.handleChange}
              error={onSubmitShopping.errors.amount}
            />
            <Input
              name="responsible"
              id="responsible"
              autoComplete="off"
              value={onSubmitShopping.values.responsible}
              onChange={onSubmitShopping.handleChange}
              placeholder="Nome do responsavel"
              error={onSubmitShopping.errors.responsible}
            />
            <Button text="Adicionar" type="submit" width="20rem" />
          </Sform>
        </ScontentModal>
      </Modal>
    </>
  );
}

export default ShoppingTableHeader;
