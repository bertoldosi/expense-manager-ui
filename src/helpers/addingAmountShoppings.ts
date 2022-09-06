import { ShoppingType } from "../components/container/HomeContainer/types";

export const addingAmountShoppings = (shoppings: ShoppingType[]) => {
  const newShoppings = shoppings
    .map((shopping) => shopping.amount)
    .reduce(
      (previousValue, currentValue) =>
        Number(previousValue) + Number(currentValue)
    );

  return newShoppings;
};
