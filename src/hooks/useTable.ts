import React from "react";

import { updateAmountShoppings } from "../helpers/updateAmountShoppings";
import { sumAmountResponsible } from "../helpers/sumAmountResponsible";
import { sumTotalResponsible } from "../helpers/sumTotalResponsible";

import {
  MonthType,
  ResponsibleValuesType,
} from "../components/container/HomeContainer/types";

const useTable = (months: MonthType[], nowMonth: Number) => {
  const [monthList, setMonthList] = React.useState<MonthType[]>([]);

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

  const [responsibleTotalAmountList, setResponsibleTotalAmountList] =
    React.useState<ResponsibleValuesType[]>([]);

  React.useEffect(() => {
    setMonthList(
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
  }, [months]);

  React.useEffect(() => {
    monthList.map((monthMap) => {
      if (monthMap.mesNumber === nowMonth) {
        setResponsibleTotalAmountList(
          sumTotalResponsible([...monthMap.institutions])
        );
      }
    });
  }, [monthList]);

  return {
    handlerShoppingsExpanded,
    monthList,
    setMonthList,

    responsibleTotalAmountList,
    setResponsibleTotalAmountList,
  };
};

export default useTable;
