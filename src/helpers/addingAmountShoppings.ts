import { ShoppingType } from "../components/container/HomeContainer/types";

export const addingAmountShoppings = (shoppings: ShoppingType[]) => {
  const newShoppings = shoppings
    .map((shopping) => shopping.amount)
    .reduce((previousValue, currentValue) => {
      previousValue = String(previousValue).replace(",", ".");
      currentValue = String(currentValue).replace(",", ".");

      console.log(previousValue);

      if (previousValue === "") {
        previousValue = "0";
      }

      return parseFloat(previousValue) + parseFloat(currentValue);
    });

  return newShoppings;
};
