import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  responsible: string;
};

type ListType = {
  id: string;
  name: string;
  amount: string;
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
      [name]: value,
    }));
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

  return {
    listTable,
    setListTable,
    handleIncludeNewBuy,
    submenusExpanded,
    newBuy,
    setNewBuy,
    handleInputNewBuy,
  };
};

export default useListCollapsibreTable;
