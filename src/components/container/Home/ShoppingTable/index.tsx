import React, { useContext, useEffect } from "react";
import Cookies from "universal-cookie";

import ShoppingTableHeader from "@containers/Home/ShoppingTableHeader";
import InputTable from "@commons/InputTable";

import { NoResult, Scontent } from "./styles";
import { userContextData, userContextDataType } from "@context/userContextData";
import { InstitutionType, ShoppingType } from "@interfaces/*";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import { maskMoney } from "@helpers/masks";

function ShoppingTable() {
  const { institution, getInstitution, setInstitution } = useContext(
    userContextData
  ) as userContextDataType;

  function fethInstitution() {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    getInstitution(cookieValues?.filter?.institution?.id);
  }

  function onChangeShopping(ev: React.ChangeEvent<HTMLInputElement>) {
    const { id, name, value } = ev.target;

    setInstitution((prevInstitution: InstitutionType) => {
      return {
        ...prevInstitution,
        shoppings: prevInstitution.shoppings?.map((shoppingMap) => {
          if (shoppingMap.id === id) {
            return {
              ...shoppingMap,
              [name]: maskMoney(value, name),
            };
          }

          return shoppingMap;
        }),
      };
    });
  }

  function updateShopping(shopping: ShoppingType) {
    instances
      .put("api/shopping", {
        ...shopping,
        amount: shopping.amount.replace(/,/g, ""),
      })
      .then(() => {
        customToast("success", "Item atualizado com sucesso!");
        fethInstitution();
      });
  }

  useEffect(() => {
    fethInstitution();
  }, []);

  return (
    <>
      <ShoppingTableHeader />
      <Scontent>
        {institution?.shoppings?.length ? (
          institution?.shoppings.map((shoppingMap, index) => (
            <span key={index}>
              <strong>
                {/* <InputTable
                  type="checkbox"
                  disabled={false}
                  name="selected"
                  onChange={() => {}}
                /> */}
                <InputTable
                  disabled={false}
                  id={shoppingMap.id}
                  name="description"
                  handleEnter={() => {
                    updateShopping(shoppingMap);
                  }}
                  value={shoppingMap.description}
                  onChange={onChangeShopping}
                />
              </strong>
              <strong>
                <InputTable
                  disabled={false}
                  id={shoppingMap.id}
                  name="amount"
                  handleEnter={() => {
                    updateShopping(shoppingMap);
                  }}
                  value={maskMoney(shoppingMap.amount, "amount")}
                  onChange={onChangeShopping}
                />
              </strong>
              <strong>
                <InputTable
                  id={shoppingMap.id}
                  name="responsible"
                  handleEnter={() => {
                    updateShopping(shoppingMap);
                  }}
                  value={shoppingMap.responsible}
                  onChange={onChangeShopping}
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
