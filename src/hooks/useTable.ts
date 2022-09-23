import React from "react";

import { updateAmountShoppings } from "../helpers/updateAmountShoppings";
import { sumAmountResponsible } from "../helpers/sumAmountResponsible";
import { sumTotalResponsible } from "../helpers/sumTotalResponsible";

import {
  InstitutionType,
  MonthType,
  ResponsibleValuesType,
} from "../components/container/HomeContainer/types";

const useTable = (InstitutionList: InstitutionType[], months: MonthType[]) => {
  const [monthList, setMonthList] = React.useState<MonthType[]>(
    months.map((month) => {
      return {
        ...month,
        institutions: month.institutions.map((institution) => {
          return {
            ...institution,
            listResponsibleValues: sumAmountResponsible(institution),
            amount: updateAmountShoppings(institution.shoppings),
            isShowShoppings: false,
            shoppings: institution.shoppings.map((shopping) => {
              return {
                ...shopping,
                isUpdate: false,
                repeat: false,
              };
            }),
          };
        }),
      };
    })
  );

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
            repeat: false,
          };
        }),
      };
    })
  );

  const [responsibleTotalAmountList, setResponsibleTotalAmountList] =
    React.useState<ResponsibleValuesType[]>(
      sumTotalResponsible(institutionList)
    );

  const handlerShoppingsExpanded = (
    institutionReference: string,
    monthId: string
  ) => {
    setMonthList(
      monthList.map((monthMap) => {
        if (monthMap.id === monthId) {
          return {
            ...monthMap,
            institutions: monthMap.institutions.map((institution) => {
              if (institutionReference === institution.reference) {
                return {
                  ...institution,
                  isShowShoppings: !institution.isShowShoppings,
                };
              } else {
                return institution;
              }
            }),
          };
        } else {
          return monthMap;
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

    monthList,
    setMonthList,
  };
};

export default useTable;
