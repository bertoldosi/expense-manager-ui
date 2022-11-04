import { ShoppingType } from "src/types/types";

export const subtractingValues = (
  firstValue: string | number,
  shopping: ShoppingType
) => {
  const secondValue = String(shopping.amount).replace(",", ".");

  firstValue = String(firstValue).replace(",", ".");

  return parseFloat(firstValue) - parseFloat(secondValue);
};
