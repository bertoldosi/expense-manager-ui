import React, { useContext, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";

import ShoppingTableHeader from "@containers/Home/ShoppingTableHeader";
import InputTable from "@commons/InputTable";

import { NoResult, Scontent } from "./styles";
import { userContextData, userContextDataType } from "@context/userContextData";
import { InstitutionType, ShoppingType } from "@interfaces/*";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import { formatedInputValue } from "@helpers/formatedInputValue";

function ShoppingTable() {
  const cookies = new Cookies();

  const { institution, getInstitution, setInstitution } = useContext(
    userContextData
  ) as userContextDataType;

  function fethInstitution() {
    const cookieValues = cookies.get("expense-manager");

    getInstitution(cookieValues?.filter?.institution?.id);
  }

  function onChangeShopping(ev: React.ChangeEvent<HTMLInputElement>) {
    const { id, name, value, checked } = ev.target;

    setInstitution((prevInstitution: InstitutionType) => {
      return {
        ...prevInstitution,
        shoppings: prevInstitution.shoppings?.map((shoppingMap) => {
          if (shoppingMap.id === id) {
            return {
              ...shoppingMap,
              [name]:
                name != "selected" ? formatedInputValue(value, name) : checked,
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

  return (
    <>
      <ShoppingTableHeader />
      <Scontent>
        {institution?.shoppings?.length ? (
          institution?.shoppings.map((shoppingMap, index) => (
            <span key={index}>
              <strong>
                <InputTable
                  id={shoppingMap.id}
                  type="checkbox"
                  name="selected"
                  checked={shoppingMap.selected}
                  onChange={onChangeShopping}
                />
                <InputTable
                  id={shoppingMap.id}
                  name="description"
                  handleEnter={() => {
                    updateShopping(shoppingMap);
                  }}
                  value={shoppingMap.description || ""}
                  onChange={onChangeShopping}
                />
              </strong>
              <strong>
                <InputTable
                  id={shoppingMap.id}
                  name="amount"
                  handleEnter={() => {
                    updateShopping(shoppingMap);
                  }}
                  value={formatedInputValue(shoppingMap.amount, "amount") || ""}
                  onChange={onChangeShopping}
                />
              </strong>
              <strong>
                <InputTable
                  id={shoppingMap.id}
                  name="category"
                  handleEnter={() => {
                    updateShopping(shoppingMap);
                  }}
                  value={shoppingMap.category || ""}
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
    </>
  );
}

export default ShoppingTable;
