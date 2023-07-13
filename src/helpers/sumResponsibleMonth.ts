import { sumAmountMoney } from "@helpers/sumAmountMoney";
import { InstitutionType, ShoppingType } from "@interfaces/*";

export const sumCategoryMonth = (institutions: InstitutionType[]) => {
  // const responsibleAmountList = Array();
  // institutions?.map((institution) => {
  //   institution.listCategoryValues?.map((category) => {
  //     responsibleAmountList.push(category);
  //   });
  // });

  // const newList = responsibleAmountList.reduce(
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
