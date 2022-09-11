import { ShoppingType } from "../components/container/HomeContainer/types";
import { somandoDinheiro } from "./somandoDinheiro";

export const addingAmountShoppings = (shoppings: ShoppingType[]) => {
  if (shoppings.length > 0) {
    const newShoppings = shoppings
      .map((shopping) => shopping.amount)
      .reduce((previousValue, currentValue) => {
        const result = somandoDinheiro(previousValue, currentValue);

        return result;
      });

    return newShoppings;
  } else {
    return 0;
  }
};
