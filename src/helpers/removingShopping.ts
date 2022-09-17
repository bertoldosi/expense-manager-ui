import { ShoppingType } from "../components/container/HomeContainer/types";

export const removingShopping = (
  shoppings: ShoppingType[],
  shoppingId: string
) => {
  const resultFilter = shoppings.filter((shopping) => {
    return shopping.reference != shoppingId;
  });

  return resultFilter;
};
