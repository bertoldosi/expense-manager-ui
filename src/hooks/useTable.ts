import React from "react";

import { addingAmountShoppings } from "../helpers/addingAmountShoppings";
import { addingResponsibleAmount } from "../helpers/addingResponsibleAmount";
import { addingResponsibleTotalAmount } from "../helpers/addingResponsibleTotalAmount";

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

  return {
    institutionList,
    setInstitutionList,
    handlerShoppingsExpanded,
    responsibleTotalAmountList,
    setResponsibleTotalAmountList,
  };
};

export default useTable;
