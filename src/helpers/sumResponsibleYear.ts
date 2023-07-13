export const sumCategoryYear = (months) => {
  const listaTotalAmountYear = new Array();

  months.map((monthMap) => {
    monthMap.institutions.map((institutionMap) => {
      institutionMap.shoppings.map((shoppingMap) => {
        listaTotalAmountYear.push(shoppingMap);
      });
    });
  });

  // const newList = listaTotalAmountYear.reduce(
  //   (previousValue: ShoppingType[], currentValue: ShoppingType) => {
  //     let newCurrentValue = {
  //       ...currentValue,
  //       amount: currentValue.amount,
  //     };
  //     let category = newCurrentValue.category;
  //     let repeated = previousValue.find(
  //       (elem: ShoppingType) => elem.category === category
  //     );
  //     if (repeated) {
  //       repeated.amount = sumAmountMoney(
  //         repeated.amount,
  //         newCurrentValue.amount
  //       );
  //     } else {
  //       previousValue.push(newCurrentValue);
  //     }
  //     return previousValue;
  //   },
  //   []
  // );

  return [];
};
