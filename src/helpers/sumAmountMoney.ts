import { ShoppingType } from "@containers/Home/types";

export const sumAmountMoney = (
  firstNumber: any,
  secondNumber: any,
  newCurrentValue: ShoppingType
) => {
  firstNumber = String(firstNumber).replace(".", "");
  firstNumber = String(firstNumber).replace(",", "");

  secondNumber = String(secondNumber).replace(".", "");
  secondNumber = String(secondNumber).replace(",", "");

  if (newCurrentValue?.status_paid === "desconta") {
    const result = -Number(secondNumber) + Number(firstNumber);

    return result;
  } else {
    const result = Number(secondNumber) + Number(firstNumber);

    return result;
  }
};
