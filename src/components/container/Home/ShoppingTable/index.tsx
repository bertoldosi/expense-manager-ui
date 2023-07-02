import React from "react";

import { HeaderTable } from "@containers/Home/ShoppingTableHeader";
import InputTable from "@commons/InputTable";
import { Modal } from "@commons/Modal";
import Input from "@commons/Input";

import { NoResult, Scontent, ScontentModal } from "./styles";

const initialNewAllShopping = {
  responsible: "",
  paymentStatus: "aberto",
  select: false,
};

const institution = {
  shoppings: [],
};

export const Table = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [newAllShopping] = React.useState(initialNewAllShopping);

  return (
    <>
      <HeaderTable />

      <Scontent>
        {institution?.shoppings?.length ? (
          institution?.shoppings.map((shoppingMap, index) => (
            <span key={index}>
              <strong>
                <InputTable
                  type="checkbox"
                  disabled={false}
                  name="selected"
                  onChange={() => {}}
                />
                <InputTable
                  disabled={false}
                  name="description"
                  handleEnter={() => {}}
                  onChange={() => {}}
                />
              </strong>
              <strong>
                <InputTable
                  disabled={false}
                  name="amount"
                  handleEnter={() => {}}
                  onChange={() => {}}
                />
              </strong>
              <strong>
                <InputTable
                  name="responsible"
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
        </ScontentModal>
      </Modal>
    </>
  );
};
