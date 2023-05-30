import React, { useContext, useEffect } from "react";

import { HeaderTable } from "../../components/HeaderTable";
import { SelectStatus } from "@commons/SelectStatus";
import InputTable from "@containers/Home/components/Shopping/components/InputTable";

import { NoResult, Scontent, ScontentModal } from "./styles";
import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import Input from "@commons/Input";

import {
  userContextData,
  userContextDataType,
} from "src/context/userContextData";

const initialNewAllShopping = {
  responsible: "",
  paymentStatus: "aberto",
  select: false,
};

export const Table = () => {
  const { institution } = useContext(userContextData) as userContextDataType;

  const [valueFilter, setValueFilter] = React.useState("todos");
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [newAllShopping] = React.useState(initialNewAllShopping);

  return (
    <>
      <HeaderTable
        setValueFilter={setValueFilter}
        options={[]}
        onChange={() => {}}
        isItensSelect={false}
        handlerRepeat={() => {}}
        isRequest={false}
        removeShoppings={() => {}}
        setIsVisible={setIsVisible}
        valueFilter={valueFilter}
      />

      <Scontent>
        {institution?.shoppings?.length ? (
          institution?.shoppings.map((shoppingMap, index) => (
            <span key={index}>
              <strong>
                <InputTable
                  type="checkbox"
                  disabled={false}
                  name="selected"
                  id={shoppingMap.id}
                  checked={shoppingMap.selected}
                  onChange={() => {}}
                />
                <InputTable
                  disabled={false}
                  name="description"
                  id={shoppingMap.id}
                  value={shoppingMap.description}
                  handleEnter={() => {}}
                  onChange={() => {}}
                />
              </strong>
              <strong>
                <InputTable
                  disabled={false}
                  name="amount"
                  id={shoppingMap.id}
                  value={shoppingMap.amount}
                  handleEnter={() => {}}
                  onChange={() => {}}
                />
              </strong>
              <strong>
                <InputTable
                  name="responsible"
                  id={shoppingMap.id}
                  value={shoppingMap.responsible}
                  handleEnter={() => {}}
                  onChange={() => {}}
                />
              </strong>
            </span>
          ))
        ) : (
          <NoResult>
            <span>Nenhum resultado encontrado!</span>
          </NoResult>
        )}
      </Scontent>

      <Modal
        title="Editando item(s)"
        isVisible={isVisible}
        handlerIsVisible={setIsVisible}
        footer={
          <Button color="#fff" background="#B0C4DE">
            Salvar
          </Button>
        }
      >
        <ScontentModal>
          <Input
            autoFocus
            disabled={false}
            name="responsible"
            placeholder="Nome do responsavel"
            id="responsible"
            value={newAllShopping.responsible}
            onChange={() => {}}
          />

          <SelectStatus
            selectClassName={newAllShopping.paymentStatus}
            optionClassName={newAllShopping.paymentStatus}
            name="paymentStatus"
            id="paymentStatus"
            value={newAllShopping.paymentStatus}
            options={[{ name: "aberto" }, { name: "pago" }]}
            onChange={() => {}}
          />
        </ScontentModal>
      </Modal>
    </>
  );
};
