import { sumAmountMoney } from "@helpers/sumAmountMoney";

import { InstitutionType, ShoppingType } from "@interfaces/*";

export const sumResponsibleCard = (institution: InstitutionType) => {
  // const newList = institution.shoppings.reduce(
  //   (previousValue: ShoppingType[], currentValue) => {
  //     if (currentValue.paymentStatus !== "pago") {
  //       let newCurrentValue = {
  //         ...currentValue,
  //       };

  //       let category = newCurrentValue.category;
  //       let repeated = previousValue.find(
  //         (elem: ResponsibleValuesType) => elem.category === category
  //       );

  //       if (repeated) {
  //         repeated.amount = sumAmountMoney(
  //           repeated.amount,
  //           newCurrentValue.amount
  //         );
  //       } else {
  //         previousValue.push(newCurrentValue);
  //       }

  //       return previousValue;
  //     } else {
  //       return previousValue;
  //     }
  //   },
  //   []
  // );

  return [];
};
