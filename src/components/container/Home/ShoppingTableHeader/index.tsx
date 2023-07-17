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
import { schemaCreate, schemaFilter } from "./validations";
import { userContextData, userContextDataType } from "@context/userContextData";
import InputTable from "@commons/InputTable";
import { Filter } from "@icons/Filter";
import InputSelect from "@commons/InputSelect";

import {
  ButtonsOptions,
  SFilterform,
  Scontent,
  ScontentModal,
  Sfilter,
  Sform,
  Slist,
  SselectingAll,
} from "./styles";

const INITIAL_SHOPPING = {
  description: "",
  amount: "",
  category: "",
  paymentStatus: "open",
};

const INITIAL_OPTIONS = {
  category: "all",
};

function ShoppingTableHeader() {
  const { getInstitution, institution, setInstitution, categories } =
    useContext(userContextData) as userContextDataType;

  const [isModalUpdateVisible, setIsModalUpdateVisible] =
    useState<boolean>(false);
  const [isModalFilterVisible, setIsModalFilterVisible] =
    useState<boolean>(false);
  const [valueSelectingAllShoppings, setValueSelectingAllShoppings] =
    useState<boolean>(false);
  const [shoppingsSeleceted, setShoppingsSelected] = useState<ShoppingType[]>(
    []
  );

  useMemo(() => {
    const shoppings = institution?.shoppings?.filter(
      (shoppingFilter) => shoppingFilter.selected
    );

    setShoppingsSelected(shoppings || []);
  }, [institution?.shoppings]);

  function handleModalUpdate() {
    setIsModalUpdateVisible(!isModalUpdateVisible);
  }

  function openModalFilter() {
    setIsModalFilterVisible(!isModalFilterVisible);
  }

  function exitModalFilter() {
    setIsModalFilterVisible(!isModalFilterVisible);
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
          category: values.category ? values.category : shoppingMap.category,
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
          setIsModalUpdateVisible(false);
          setValueSelectingAllShoppings(false);
        })
        .catch((response) => {
          customToast("error", "Algo deu errado, tente novamente mais tarde!");
        });

      onSubmitShopping.resetForm();
    },

    validationSchema: schemaCreate,
  });

  const onSubmitFilterShopping = useFormik({
    initialValues: INITIAL_OPTIONS,
    onSubmit: async (values) => {
      instances
        .get("api/shopping", {
          params: {
            category: values.category,
            institutionId: institution?.id,
          },
        })
        .then((response) => {
          setInstitution((prevInstitution: ShoppingType) => ({
            ...prevInstitution,
            shoppings: response.data,
          }));
          setIsModalFilterVisible(false);
        })
        .catch(() => {
          customToast("error", "Tente novamente, mais tarde!");
        });
    },

    validationSchema: schemaFilter,
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
          <Sfilter onClick={openModalFilter}>
            <Filter width="2rem" height="2rem" />
            <span>{onSubmitFilterShopping.values.category}</span>
          </Sfilter>

          {shoppingsSeleceted.length ? (
            <>
              <Button
                text="Editar"
                width="30rem"
                height="2.5rem"
                onClick={handleModalUpdate}
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
        isVisible={isModalUpdateVisible}
        handlerIsVisible={handleModalUpdate}
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
              name="category"
              id="category"
              autoComplete="off"
              value={onSubmitShopping.values.category}
              onChange={onSubmitShopping.handleChange}
              placeholder="Nome da categoria"
              error={onSubmitShopping.errors.category}
            />
            <Button text="Adicionar" type="submit" width="20rem" />
          </Sform>
        </ScontentModal>
      </Modal>

      <Modal
        title="Filtrando itens"
        isVisible={isModalFilterVisible}
        handlerIsVisible={exitModalFilter}
      >
        <ScontentModal>
          <SFilterform onSubmit={onSubmitFilterShopping.handleSubmit}>
            <InputSelect
              name="category"
              id="category"
              value={onSubmitFilterShopping.values.category}
              onChange={onSubmitFilterShopping.handleChange}
              defaultOption={{ value: "all", label: "Todos" }}
              options={categories.map((option) => ({
                value: option.category,
                label: option.category,
              }))}
            />
            <Button text="Filtrar" type="submit" width="20rem" />
          </SFilterform>
        </ScontentModal>
      </Modal>
    </>
  );
}

export default ShoppingTableHeader;
