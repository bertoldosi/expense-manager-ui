import {
  InstitutionType,
  ResponsibleValuesType,
  ShoppingType,
} from "../components/container/HomeContainer/types";
import { somandoDinheiro } from "./somandoDinheiro";

export const addingResponsibleAmount = (institution: InstitutionType) => {
  const newList = institution.shoppings.reduce(
    (previousValue: ShoppingType[], currentValue) => {
      let newCurrentValue = {
        ...currentValue,
        amount: currentValue.amount,
      };

      let responsible = newCurrentValue.responsible;

      let repeated = previousValue.find(
        (elem: ResponsibleValuesType) => elem.responsible === responsible
      );

      if (repeated) {
        repeated.amount = somandoDinheiro(
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
