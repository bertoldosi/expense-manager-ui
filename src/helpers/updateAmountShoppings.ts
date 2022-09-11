import { ShoppingType } from "../components/container/HomeContainer/types";
import { sumAmountMoney } from "./sumAmountMoney";

export const updateAmountShoppings = (shoppings: ShoppingType[]) => {
  if (shoppings.length > 0) {
    const newShoppings = shoppings
      .map((shopping) => shopping.amount)
      .reduce((previousValue, currentValue) => {
        const result = sumAmountMoney(previousValue, currentValue);

        return result;
      });

    return newShoppings;
  } else {
    return 0;
  }
};
