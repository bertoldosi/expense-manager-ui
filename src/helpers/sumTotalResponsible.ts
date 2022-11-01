import { sumAmountMoney } from "@helpers/sumAmountMoney";
import { InstitutionType, ShoppingType } from "@containers/Home/types";

export const sumTotalResponsible = (institutions: InstitutionType[]) => {
  const responsibleAmountList = Array();
  institutions?.map((institution) => {
    institution.listResponsibleValues?.map((responsible) => {
      responsibleAmountList.push(responsible);
    });
  });

  const newList = responsibleAmountList.reduce(
    (previousValue: ShoppingType[], currentValue: ShoppingType) => {
      let newCurrentValue = {
        ...currentValue,
        amount: currentValue.amount,
      };
      let responsible = newCurrentValue.responsible;
      let repeated = previousValue.find(
        (elem: ShoppingType) => elem.responsible === responsible
      );
      if (repeated) {
        repeated.amount = sumAmountMoney(
          repeated.amount,
          newCurrentValue.amount,
          newCurrentValue
        );
      } else {
        previousValue.push(newCurrentValue);
      }
      return previousValue;
    },
    []
  );

  return newList;
};
