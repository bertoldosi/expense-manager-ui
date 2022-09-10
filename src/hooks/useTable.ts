import React from "react";

import { addingAmountShoppings } from "../helpers/addingAmountShoppings";
import { addingResponsibleAmount } from "../helpers/addingResponsibleAmount";
import { addingResponsibleTotalAmount } from "../helpers/addingResponsibleTotalAmount";
import { maskMorney } from "../helpers/masks";

import {
  InstitutionType,
  ResponsibleValuesType,
} from "../components/container/HomeContainer/types";

const useTable = (InstitutionList: InstitutionType[]) => {
  const [institutionList, setInstitutionList] = React.useState<
    InstitutionType[]
  >(
    InstitutionList.map((institution) => {
      return {
        ...institution,
        listResponsibleValues: addingResponsibleAmount(institution),
        amount: addingAmountShoppings(institution.shoppings),
        isShowShoppings: false,
      };
    })
  );

  const [responsibleTotalAmountList, setResponsibleTotalAmountList] =
    React.useState<ResponsibleValuesType[]>(
      addingResponsibleTotalAmount(institutionList)
    );

  const handlerShoppingsExpanded = (itemId: string) => {
    setInstitutionList(
      institutionList.map((item) => {
        if (itemId === item.id) {
          return { ...item, isShowShoppings: !item.isShowShoppings };
        } else {
          return item;
        }
      })
    );
  };

  const handlerInputChange = (
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
    handlerShoppingsExpanded,
    handlerInputChange,
    responsibleTotalAmountList,
    setResponsibleTotalAmountList,
  };
};

export default useTable;
