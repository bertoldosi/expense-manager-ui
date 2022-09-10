import {
  InstitutionType,
  ResponsibleValuesType,
  ShoppingType,
} from "../components/container/HomeContainer/types";

export const addingResponsibleAmount = (institution: InstitutionType) => {
  const newList = institution.shoppings.reduce(
    (previousValue: ShoppingType[], currentValue) => {
      const newCurrentValue = {
        ...currentValue,
        amount: String(currentValue.amount).replace(",", "."),
      };

      let responsible = newCurrentValue.responsible;

      let repeated = previousValue.find(
        (elem: ResponsibleValuesType) => elem.responsible === responsible
      );

      if (repeated) {
        repeated.amount = String(repeated.amount).replace(",", ".");

        repeated.amount =
          parseFloat(repeated.amount) + parseFloat(newCurrentValue.amount);
        repeated.amount = parseFloat(repeated.amount.toFixed(2));
      } else {
        previousValue.push(newCurrentValue);
      }

      return previousValue;
    },
    []
  );

  return newList;
};
