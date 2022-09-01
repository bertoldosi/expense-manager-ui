import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { maskMorney } from "../helpers/masks";

type ShoppingType = {
  id: string;
  description: string;
  amount: string | number;
  responsible: string;
};

type ListType = {
  id: string;
  name: string;
  amount: string | number;
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

const useListCollapsibreTable = (list: ListType[]) => {
  const [newBuy, setNewBuy] = useState<ShoppingType>(initialNewBuy);

  const [listTable, setListTable] = useState<ListType[]>(
    list.map((item) => {
      return {
        ...item,
        responsibleAmount: {
          matheus: "19,90",
          fran: "49,90",
        },
        amount: item.shoppings
          .map((shopping) => shopping.amount)
          .reduce(
            (previousValue, currentValue) =>
              Number(previousValue) + Number(currentValue)
          ),
        showSubmenus: false,
        shoppings: item.shoppings.map((menu: ShoppingType) => ({
          ...menu,
          responsibleAmount: {
            matheus: "19,90",
            fran: "49,90",
          },
        })),
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

  const addingValues = (
    firstValue: string | number,
    secondValue: string | number
  ) => {
    firstValue = String(firstValue).replace(",", ".");
    secondValue = String(secondValue).replace(",", ".");

    console.log(firstValue, secondValue);

    return parseFloat(firstValue) + parseFloat(secondValue);
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

  React.useEffect(() => {
    console.log(listTable);
  }, []);

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
