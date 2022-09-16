import {
  InstitutionType,
  ShoppingType,
} from "../components/container/HomeContainer/types";
import { sumAmountMoney } from "./sumAmountMoney";

export const sumTotalResponsible = (institutions: InstitutionType[]) => {
  const responsibleAmountList = Array();
  institutions.map((institution) => {
    institution.listResponsibleValues.map((responsible) => {
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
          newCurrentValue.amount
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