import { sumAmountMoney } from "@helpers/sumAmountMoney";

import {
  InstitutionType,
  ResponsibleValuesType,
  ShoppingType,
} from "@containers/Home/types";

export const sumAmountResponsible = (institution: InstitutionType) => {
  const newList = institution.shoppings.reduce(
    (previousValue: ShoppingType[], currentValue) => {
      let newCurrentValue = {
        ...currentValue,
        amount:
          currentValue.status_paid === "desconta" ? 0 : currentValue.amount,
      };

      let responsible = newCurrentValue.responsible;

      let repeated = previousValue.find(
        (elem: ResponsibleValuesType) => elem.responsible === responsible
      );

      if (repeated) {
        repeated.amount = sumAmountMoney(
          repeated.amount,
          newCurrentValue.amount
        );
      } else {
        previousValue.push(newCurrentValue);
      }

      return previousValue;
    },
    []
  );

  return newList;
};
