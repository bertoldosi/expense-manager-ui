import { ShoppingType } from "@containers/HomeContainer/types";

export const removingShopping = (
  shoppings: ShoppingType[],
  shoppingReference: string
) => {
  const resultFilter = shoppings.filter((shopping) => {
    return shopping.reference != shoppingReference;
  });

  return resultFilter;
};
