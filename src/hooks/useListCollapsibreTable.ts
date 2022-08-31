import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { maskMorney } from "../helpers/maskMorney";

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
        amount: item.shoppings
          .map((shopping) => shopping.amount)
          .reduce(
            (previousValue, currentValue) =>
              Number(previousValue) + Number(currentValue)
          ),
        showSubmenus: false,
        shoppings: item.shoppings.map((menu: ShoppingType) => ({
          ...menu,
        })),
      };
    })
  );

  const handleInputNewBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewBuy((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

  const updateInstituiçãoAmount = () => {
    setListTable(
      listTable.map((institution) => {
        return {
          ...institution,
          amount: institution.shoppings
            .map((shopping) => shopping.amount)
            .reduce(
              (previousValue, currentValue) =>
                Number(previousValue) + Number(currentValue)
            ),
        };
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
              amount: Number(institution.amount) + Number(newBuy.amount),
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

  useEffect(() => {}, [listTable]);

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
