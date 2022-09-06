import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addingAmountShoppings } from "../helpers/addingAmountShoppings";
import { addingResponsibleAmount } from "../helpers/addingResponsibleAmount";
import { addingValues } from "../helpers/addingValues";
import { maskMorney } from "../helpers/masks";

type ShoppingType = {
  id: string;
  description: string;
  amount: string | number;
  responsible: string;
};

type ResponsibleAmountType = {
  name: string;
  amount: string | number;
};

type InstitutionType = {
  id: string;
  name: string;
  amount: string | number;
  responsibleAmount: ResponsibleAmountType[];
  expirationDate: string;
  showSubmenus?: boolean;
  shoppings: ShoppingType[];
};

const initialNewBuy = {
  id: uuidv4(),
  description: "",
  amount: "",
  responsible: "",
};

const useListCollapsibreTable = (InstitutionList: InstitutionType[]) => {
  const [newBuy, setNewBuy] = useState<ShoppingType>(initialNewBuy);

  const [listTable, setListTable] = useState<InstitutionType[]>(
    InstitutionList.map((institution) => {
      return {
        ...institution,
        responsibleAmount: addingResponsibleAmount(institution),
        amount: addingAmountShoppings(institution.shoppings),
        showSubmenus: false,
      };
    })
  );

  const submenusExpanded = (itemId: string) => {
    setListTable(
      listTable.map((item) => {
        if (itemId === item.id) {
          return { ...item, showSubmenus: !item.showSubmenus };
        } else {
          return item;
        }
      })
    );
  };

  const handleInputNewBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewBuy((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    institutionId: string
  ) => {
    const { id, value, name } = event.target;

    setListTable(
      listTable.map((institution) => {
        if (institution.id === institutionId) {
          return {
            ...institution,
            responsibleAmount: addingResponsibleAmount(institution),
            shoppings: institution.shoppings.map((shopping) => {
              if (shopping.id === id) {
                return {
                  ...shopping,
                  [name]: maskMorney(value, name),
                };
              } else {
                return shopping;
              }
            }),
          };
        } else {
          return institution;
        }
      })
    );
  };

  const handleIncludeNewBuy = (institutionId: string) => {
    const isFilled =
      newBuy.description != "" &&
      newBuy.amount != "" &&
      newBuy.responsible != "";

    if (isFilled) {
      setListTable(
        listTable.map((institution) => {
          if (institution.id === institutionId) {
            return {
              ...institution,
              responsibleAmount: addingResponsibleAmount(institution),
              amount: addingValues(institution.amount, newBuy.amount),
              shoppings: [...institution.shoppings, newBuy],
            };
          } else {
            return institution;
          }
        })
      );

      setNewBuy(initialNewBuy);
    } else {
      alert("Precisa preencher todos os campos");
    }
  };

  // React.useEffect(() => {
  //   console.log(listTable);
  // }, [listTable]);

  return {
    listTable,
    setListTable,
    handleIncludeNewBuy,
    submenusExpanded,
    newBuy,
    setNewBuy,
    handleInputNewBuy,
    handleInputChange,
  };
};

export default useListCollapsibreTable;
