import { sumAmountMoney } from "@helpers/sumAmountMoney";
import { MonthType, ShoppingType } from "@interfaces/*";

export const sumResponsibleYear = (months: MonthType[]) => {
  const listaTotalAmountYear = new Array();

  months.map((monthMap) => {
    monthMap.institutions.map((institutionMap) => {
      institutionMap.shoppings.map((shoppingMap) => {
        listaTotalAmountYear.push(shoppingMap);
      });
    });
  });

  const newList = listaTotalAmountYear.reduce(
    (previousValue: ShoppingType[], currentValue: ShoppingType) => {
      let newCurrentValue = {
        ...currentValue,
        amount: currentValue.amount,
      };
      let responsible = newCurrentValue.responsible;
      let repeated = previousValue.find(
        (elem: ShoppingType) => elem.responsible === responsible
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
