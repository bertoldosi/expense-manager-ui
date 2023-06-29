import { sumAmountMoney } from "@helpers/sumAmountMoney";

export const updateAmountShoppings = (shoppings: any) => {
  if (shoppings.length > 0) {
    const newShoppings = shoppings
      .map((shopping) => shopping.amount)
      .reduce((previousValue: any, currentValue: any) => {
        const result = sumAmountMoney(previousValue, currentValue);

        return result;
      });

    return newShoppings;
  } else {
    return 0;
  }
};
