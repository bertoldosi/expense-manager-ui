import { ShoppingType } from "@interfaces/*";
import React, { useContext, useMemo } from "react";
import { GroupLeft, Scontent } from "./styles";
import { Button } from "@commons/Button";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import Cookies from "universal-cookie";
import { userContextData, userContextDataType } from "@context/userContextData";

interface ShoppingTableHeaderType {
  shoppings: ShoppingType[];
}

function ShoppingTableHeader({ shoppings }: ShoppingTableHeaderType) {
  const { getInstitution } = useContext(userContextData) as userContextDataType;

  function fethInstitution() {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    getInstitution(cookieValues?.filter?.institution?.id);
  }

  function updateShoppings() {
    console.log(shoppings);
  }

  function deleteShoppings() {
    instances
      .delete("api/shopping", {
        data: {
          shoppings: shoppings,
        },
      })
      .then((response) => {
        fethInstitution();
        customToast("success", "Itens excluidos com sucesso!");
      })
      .catch((response) => {
        customToast("error", "Algo deu errado, tente novamente mais tarde!");
      });
  }

  return (
    <Scontent>
      <div>
        <h3>Selecionar todos</h3>
      </div>

      <GroupLeft>
        {shoppings.length ? (
          <>
            <Button
              text="Editar"
              width="30rem"
              height="2.5rem"
              onClick={updateShoppings}
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
      </GroupLeft>
    </Scontent>
  );
}

export default ShoppingTableHeader;
