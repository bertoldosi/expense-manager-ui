import React from "react";

import { updateAmountShoppings } from "../helpers/updateAmountShoppings";
import { sumAmountResponsible } from "../helpers/sumAmountResponsible";
import { sumTotalResponsible } from "../helpers/sumTotalResponsible";

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
        listResponsibleValues: sumAmountResponsible(institution),
        amount: updateAmountShoppings(institution.shoppings),
        isShowShoppings: false,
        shoppings: institution.shoppings.map((shopping) => {
          return {
            ...shopping,
            isUpdate: false,
          };
        }),
      };
    })
  );

  const [responsibleTotalAmountList, setResponsibleTotalAmountList] =
    React.useState<ResponsibleValuesType[]>(
      sumTotalResponsible(institutionList)
    );

  const handlerShoppingsExpanded = (itemId: string) => {
    setInstitutionList(
      institutionList.map((item) => {
        if (itemId === item.reference) {
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
