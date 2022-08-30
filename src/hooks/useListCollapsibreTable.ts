import { useState } from "react";

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

const useListCollapsibreTable = (list: ListType[]) => {
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

  const updateInstitutionAmount = (institutionId: any, newBuy: any) => {
    const newListTable = listTable.map((institution) => {
      if (institution.id === institutionId) {
        return {
          ...institution,
          shoppings: [...institution.shoppings, newBuy],
        };
      } else {
        return institution;
      }
    });

    setListTable(newListTable);

    console.log(newListTable);
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

  return { listTable, setListTable, updateInstitutionAmount, submenusExpanded };
};

export default useListCollapsibreTable;
