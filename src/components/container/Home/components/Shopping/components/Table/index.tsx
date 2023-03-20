import React from "react";

import { Save } from "@icons/Save";
import { HeaderTable } from "../../components/HeaderTable";
import { SelectStatus } from "@commons/SelectStatus";
import InputTable from "@containers/Home/components/Shopping/components/InputTable";

import { NoResult, Scontent, ScontentModal } from "./styles";
import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { InstitutionType } from "@interfaces/*";

type PropsType = {
  institution: InstitutionType;
};

const initialNewAllShopping = {
  responsible: "",
  paymentStatus: "aberto",
  select: false,
};

export const Table = ({ institution }: PropsType) => {
  const [valueFilter, setValueFilter] = React.useState("todos");
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [newAllShopping] = React.useState(initialNewAllShopping);

  return (
    <>
      <HeaderTable
        setValueFilter={setValueFilter}
        options={institution.listResponsibleValues}
        onChange={() => {}}
        isItensSelect={false}
        handlerRepeat={() => {}}
        isRequest={false}
        removeShoppings={() => {}}
        setIsVisible={setIsVisible}
        valueFilter={valueFilter}
      />

      <Scontent>
        {institution.shoppings.length > 0 ? (
          institution.shoppings.map((shopping, index) => (
            <span key={index}>
              <strong>
                <InputTable
                  className={shopping.paymentStatus}
                  type="checkbox"
                  disabled={false}
                  name="select"
                  id={shopping.reference}
                  checked={shopping.select}
                  onChange={() => {}}
                />
                <InputTable
                  className={shopping.paymentStatus}
                  disabled={false}
                  name="description"
                  id={shopping.reference}
                  value={shopping.description}
                  handleEnter={() => {}}
                  onChange={() => {}}
                />
              </strong>
              <strong>
                <InputTable
                  className={shopping.paymentStatus}
                  disabled={false}
                  name="amount"
                  id={shopping.reference}
                  value={shopping.amount}
                  handleEnter={() => {}}
                  onChange={() => {}}
                />
              </strong>
              <strong>
                <InputTable
                  className={shopping.paymentStatus}
                  disabled={false || valueFilter != "todos"}
                  name="responsible"
                  id={shopping.reference}
                  value={shopping.responsible}
                  handleEnter={() => {}}
                  onChange={() => {}}
                />
              </strong>
              <strong>
                <SelectStatus
                  selectClassName={shopping.paymentStatus}
                  optionClassName={shopping.paymentStatus}
                  name="paymentStatus"
                  id={shopping.reference}
                  value={shopping.paymentStatus}
                  options={[{ name: "aberto" }, { name: "pago" }]}
                  onChange={() => {}}
                />

                {shopping.isUpdate && (
                  <Save
                    width={20}
                    height={20}
                    disabled={false}
                    onClick={() => {}}
                  />
                )}
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
