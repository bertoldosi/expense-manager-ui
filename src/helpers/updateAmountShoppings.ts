import { sumAmountMoney } from "@helpers/sumAmountMoney";
import { ShoppingType } from "@containers/Home/types";

export const updateAmountShoppings = (shoppings: ShoppingType[]) => {
  if (shoppings.length > 0) {
    const newShoppings = shoppings.reduce((previousValue, currentValue) => {
      const result = sumAmountMoney(
        previousValue.amount,
        currentValue.amount,
        currentValue
      );

      return result;
    });

    return newShoppings;
  } else {
    return 0;
  }
};
