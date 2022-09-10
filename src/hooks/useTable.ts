import React, { useEffect, useState } from "react";
import {
  InstitutionType,
  ResponsibleValuesType,
} from "../components/container/HomeContainer/types";
import { addingAmountShoppings } from "../helpers/addingAmountShoppings";
import { addingResponsibleAmount } from "../helpers/addingResponsibleAmount";
import { addingResponsibleTotalAmount } from "../helpers/addingResponsibleTotalAmount";
import { maskMorney } from "../helpers/masks";

const useTable = (InstitutionList: InstitutionType[]) => {
  const [institutionList, setInstitutionList] = useState<InstitutionType[]>(
    InstitutionList.map((institution) => {
      return {
        ...institution,
        listResponsibleValues: addingResponsibleAmount(institution),
        amount: addingAmountShoppings(institution.shoppings),
        showSubmenus: false,
      };
    })
  );

  const [responsibleTotalAmountList, setResponsibleTotalAmountList] = useState<
    ResponsibleValuesType[]
  >(addingResponsibleTotalAmount(institutionList));

  const submenusExpanded = (itemId: string) => {
    setInstitutionList(
      institutionList.map((item) => {
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

    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.id === institutionId) {
          return {
            ...institution,
            listResponsibleValues: addingResponsibleAmount(institution),
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
    institutionList,
    setInstitutionList,
    submenusExpanded,
    handleInputChange,
    responsibleTotalAmountList,
    setResponsibleTotalAmountList,
  };
};

export default useTable;
