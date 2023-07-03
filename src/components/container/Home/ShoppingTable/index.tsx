import React, { useContext, useMemo } from "react";

import ShoppingTableHeader from "@containers/Home/ShoppingTableHeader";
import InputTable from "@commons/InputTable";
import { Modal } from "@commons/Modal";
import Input from "@commons/Input";

import { NoResult, Scontent, ScontentModal } from "./styles";
import { userContextData, userContextDataType } from "@context/userContextData";
import Cookies from "universal-cookie";

// const initialNewAllShopping = {
//   responsible: "",
//   paymentStatus: "aberto",
//   select: false,
// };

function ShoppingTable() {
  const { institution, getInstitution } = useContext(
    userContextData
  ) as userContextDataType;

  // const [isVisible, setIsVisible] = React.useState<boolean>(false);
  // const [newAllShopping] = React.useState(initialNewAllShopping);

  useMemo(() => {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    getInstitution(cookieValues?.filter?.institution?.id);
  }, []);

  return (
    <>
      <ShoppingTableHeader />

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
                  value={shoppingMap.description}
                  onChange={() => {}}
                />
              </strong>
              <strong>
                <InputTable
                  disabled={false}
                  name="amount"
                  handleEnter={() => {}}
                  value={shoppingMap.amount}
                  onChange={() => {}}
                />
              </strong>
              <strong>
                <InputTable
                  name="responsible"
                  handleEnter={() => {}}
                  value={shoppingMap.responsible}
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

      {/* <Modal
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
            value={shoppingMap.}
            onChange={() => {}}
          />
        </ScontentModal>
      </Modal> */}
    </>
  );
}

export default ShoppingTable;
