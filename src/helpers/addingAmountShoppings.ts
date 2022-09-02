type ShoppingType = {
  id: string;
  description: string;
  amount: string | number;
  responsible: string;
};

export const addingAmountShoppings = (shoppings: ShoppingType[]) => {
  const newShoppings = shoppings
    .map((shopping) => shopping.amount)
    .reduce(
      (previousValue, currentValue) =>
        Number(previousValue) + Number(currentValue)
    );

  return newShoppings;
};
