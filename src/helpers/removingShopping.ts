import { ShoppingType } from "@interfaces/*";

export const removingShopping = (
  shoppings: ShoppingType[],
  shoppingId: string
) => {
  const resultFilter = shoppings.filter((shopping) => {
    return shopping.id != shoppingId;
  });

  return resultFilter;
};
