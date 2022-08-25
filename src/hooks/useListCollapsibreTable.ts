import { useState } from "react";

type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  responsible: string;
};

type ListType = {
  id: string;
  institution: string;
  amount: string;
  expiration_date: string;
  showSubmenus?: boolean;
  shopping: ShoppingType[];
};

const useListCollapsibreTable = (list: ListType[]) => {
  const [listTable, setListTable] = useState<ListType[]>(
    list.map((item) => {
      return {
        ...item,
        showSubmenus: false,
        shopping: item.shopping.map((menu: ShoppingType) => ({
          ...menu,
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

  return { listTable, setListTable, submenusExpanded };
};

export default useListCollapsibreTable;
