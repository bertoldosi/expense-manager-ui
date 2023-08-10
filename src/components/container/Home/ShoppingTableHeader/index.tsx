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
  SbuttonsOptions,
  Sfilterform,
  Scontent,
  ScontentModal,
  Sfilter,
  Sform,
  Slist,
  Srepeat,
  SselectingAll,
} from "./styles";
import { toast } from "react-toastify";

interface ShoppingUpdateType {
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
  repeat: string;
  selected?: boolean;
  institutionId?: string;
}

const INITIAL_SHOPPING = {
  description: "",
  amount: "",
  category: "",
  paymentStatus: "",
  repeat: "",
};

const INITIAL_OPTIONS_PAYMENT_STATUS = [
  { label: "Aberto", value: "open" },
  { label: "Pago", value: "closed" },
];

const INITIAL_OPTIONS = {
  category: "all",
};

const INITIAL_OPTIONS_REPEAT = [
  { label: "Próximo(s) 1 mês", value: "1" },
  { label: "Próximo(s) 2 mês", value: "2" },
  { label: "Próximo(s) 3 mês", value: "3" },
  { label: "Próximo(s) 4 mês", value: "4" },
  { label: "Próximo(s) 5 mês", value: "5" },
  { label: "Próximo(s) 6 mês", value: "6" },
  { label: "Próximo(s) 7 mês", value: "7" },
  { label: "Próximo(s) 8 mês", value: "8" },
  { label: "Próximo(s) 9 mês", value: "9" },
  { label: "Próximo(s) 10 mês", value: "10" },
  { label: "Próximo(s) 11 mês", value: "11" },
  { label: "Próximo(s) 12 mês", value: "12" },
];

function ShoppingTableHeader() {
  const {
    getInstitution,
    institution,
    setInstitution,
    getExpense,
    categories,
  } = useContext(userContextData) as userContextDataType;

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

  async function fethInstitutionAndExpense() {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    await getInstitution(cookieValues?.filter?.institution?.id);
    await getExpense(
      cookieValues?.filter.expense.id,
      cookieValues?.filter.institutions.createAt
    );
  }

  async function deleteShoppings() {
    async function requestDelete() {
      return await instances
        .delete("api/shopping", {
          data: {
            shoppings: shoppingsSeleceted,
          },
        })
        .then(async () => {
          await fethInstitutionAndExpense();
          setValueSelectingAllShoppings(false);
        });
    }

    await customToast(requestDelete);
  }

  async function filterShoppings(values: { category: string }) {
    const category = values.category === "all" ? "" : values.category;

    async function requestFilter() {
      return await instances
        .get("api/shopping", {
          params: {
            category: category,
            institutionId: institution?.id,
          },
        })
        .then((response) => {
          setInstitution((prevInstitution: ShoppingType) => ({
            ...prevInstitution,
            shoppings: response.data,
          }));
          setIsModalFilterVisible(false);
        });
    }

    await customToast(requestFilter);
  }

  async function repeatShoppings(
    numberRepeat: string,
    newShoppings: ShoppingType[]
  ) {
    const requestRepeat = async () => {
      return await instances
        .post("api/shopping/repeat", {
          repeat: Number(numberRepeat),
          shoppings: newShoppings,
        })
        .then(async () => {
          await fethInstitutionAndExpense();
          setValueSelectingAllShoppings(false);
        });
    };

    await customToast(
      requestRepeat,
      "Replicando compras",
      "Compras repetidas para o(s) próximo(o) meses"
    );
  }

  async function updateAllShoppings(values: ShoppingUpdateType) {
    const isNewInput =
      !!values.description ||
      !!values.amount ||
      !!values.category ||
      !!values.paymentStatus ||
      !!values.repeat;

    if (isNewInput) {
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

      const requestUpdate = async () => {
        return await instances
          .put("api/shopping", {
            shoppings: newShoppings,
          })
          .then(async () => {
            await fethInstitutionAndExpense();
            setValueSelectingAllShoppings(false);
          });
      };
      await customToast(requestUpdate);

      if (values.repeat) {
        await repeatShoppings(values.repeat, newShoppings);
      }
    } else {
      toast.info(<h3>Nenhum campo alterado!</h3>);
    }

    setIsModalUpdateVisible(false);
  }

  const onSubmitShopping = useFormik({
    initialValues: INITIAL_SHOPPING,
    onSubmit: async (values) => {
      await updateAllShoppings(values);

      onSubmitShopping.resetForm();
    },

    validationSchema: schemaCreate,
  });

  const onSubmitFilterShopping = useFormik({
    initialValues: INITIAL_OPTIONS,
    onSubmit: async (values) => {
      await filterShoppings(values);
    },

    validationSchema: schemaFilter,
  });

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

        <SbuttonsOptions>
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
        </SbuttonsOptions>
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
              {shoppingsSeleceted.map((shoppingMap, index) => (
                <li key={index}>{shoppingMap.description}</li>
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

            <InputSelect
              name="paymentStatus"
              id="paymentStatus"
              value={onSubmitShopping.values.paymentStatus}
              onChange={onSubmitShopping.handleChange}
              defaultOption={{ label: "Selecione um status", value: "" }}
              options={INITIAL_OPTIONS_PAYMENT_STATUS}
            />

            <Srepeat>
              <h2>Repetindo item(s)</h2>
              <InputSelect
                name="repeat"
                id="repeat"
                value={onSubmitShopping.values.repeat}
                onChange={onSubmitShopping.handleChange}
                defaultOption={{ label: "Selecione um valor", value: "0" }}
                options={INITIAL_OPTIONS_REPEAT}
              />
            </Srepeat>

            <Button text="Salvar" type="submit" width="20rem" />
          </Sform>
        </ScontentModal>
      </Modal>

      <Modal
        title="Filtrando itens"
        isVisible={isModalFilterVisible}
        handlerIsVisible={exitModalFilter}
      >
        <ScontentModal>
          <Sfilterform onSubmit={onSubmitFilterShopping.handleSubmit}>
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
          </Sfilterform>
        </ScontentModal>
      </Modal>
    </>
  );
}

export default ShoppingTableHeader;
