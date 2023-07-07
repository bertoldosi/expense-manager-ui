import { ShoppingType } from "@interfaces/*";
import React, { useContext, useMemo, useState } from "react";
import { GroupLeft, Scontent } from "./styles";
import { Button } from "@commons/Button";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import Cookies from "universal-cookie";
import { userContextData, userContextDataType } from "@context/userContextData";

function ShoppingTableHeader() {
  const { getInstitution, institution } = useContext(
    userContextData
  ) as userContextDataType;

  const [shoppingsSeleceted, setShoppingsSelected] = useState<ShoppingType[]>(
    []
  );

  function fethInstitution() {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    getInstitution(cookieValues?.filter?.institution?.id);
  }

  function updateShoppings() {
    console.log(shoppingsSeleceted);
  }

  function deleteShoppings() {
    instances
      .delete("api/shopping", {
        data: {
          shoppings: shoppingsSeleceted,
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

  useMemo(() => {
    const shoppings = institution?.shoppings?.filter(
      (shoppingFilter) => shoppingFilter.selected
    );

    setShoppingsSelected(shoppings || []);
  }, [institution?.shoppings]);

  return (
    <Scontent>
      <div>
        <h3>Selecionar todos</h3>
      </div>

      <GroupLeft>
        {shoppingsSeleceted.length ? (
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
