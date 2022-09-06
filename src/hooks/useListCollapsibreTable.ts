import React, { useEffect, useState } from "react";
import { InstitutionType } from "../components/container/HomeContainer/types";
import { addingAmountShoppings } from "../helpers/addingAmountShoppings";
import { addingResponsibleAmount } from "../helpers/addingResponsibleAmount";
import { maskMorney } from "../helpers/masks";

const useListCollapsibreTable = (InstitutionList: InstitutionType[]) => {
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

  return {
    listTable,
    setListTable,
    submenusExpanded,
    handleInputChange,
  };
};

export default useListCollapsibreTable;
