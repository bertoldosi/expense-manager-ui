import {
  InstitutionType,
  ShoppingType,
} from "../components/container/HomeContainer/types";

export const sumTotalResponsible = (institutions: InstitutionType[]) => {
  const responsibleAmountList = Array();
  institutions.map((institution) => {
    institution.listResponsibleValues.map((responsible) => {
      responsibleAmountList.push(responsible);
    });
  });

  const newList = responsibleAmountList.reduce(
    (previousValue: ShoppingType[], currentValue: ShoppingType) => {
      const newCurrentValue = {
        ...currentValue,
        amount: String(currentValue.amount).replace(",", "."),
      };
      let responsible = newCurrentValue.responsible;
      let repeated = previousValue.find(
        (elem: ShoppingType) => elem.responsible === responsible
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
