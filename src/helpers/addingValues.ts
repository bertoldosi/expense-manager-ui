import { somandoDinheiro } from "./somandoDinheiro";

export const addingValues = (
  firstValue: string | number,
  secondValue: string | number
) => {
  // firstValue = String(firstValue).replace(",", ".");
  // secondValue = String(secondValue).replace(",", ".");

  // return parseFloat(firstValue) + parseFloat(secondValue);

  const result = somandoDinheiro(firstValue, secondValue);

  return result;
};
