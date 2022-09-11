import { ShoppingType } from "../components/container/HomeContainer/types";

export const addingAmountShoppings = (shoppings: ShoppingType[]) => {
  if (shoppings.length > 0) {
    const newShoppings = shoppings
      .map((shopping) => shopping.amount)
      .reduce((previousValue, currentValue) => {
        currentValue = String(currentValue).replace(".", "");
        currentValue = String(currentValue).replace(",", "");

        previousValue = String(previousValue).replace(".", "");
        previousValue = String(previousValue).replace(",", "");

        const result = Number(previousValue) + Number(currentValue);

        return result;
      });

    return newShoppings;
  } else {
    return 0;
  }
};
