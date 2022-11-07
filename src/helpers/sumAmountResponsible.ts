import { sumAmountMoney } from "@helpers/sumAmountMoney";

import {
  InstitutionType,
  ResponsibleValuesType,
  ShoppingType,
} from "@interfaces/*";

export const sumAmountResponsible = (institution: InstitutionType) => {
  const newList = institution.shoppings.reduce(
    (previousValue: ShoppingType[], currentValue) => {
      let newCurrentValue = {
        ...currentValue,
        amount:
          currentValue.payment_status === "pago" ? 0 : currentValue.amount,
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
