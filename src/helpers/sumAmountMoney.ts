import { ShoppingType } from "@containers/Home/types";

export const sumAmountMoney = (firstNumber: any, secondNumber: any) => {
  firstNumber = String(firstNumber).replace(".", "");
  firstNumber = String(firstNumber).replace(",", "");

  secondNumber = String(secondNumber).replace(".", "");
  secondNumber = String(secondNumber).replace(",", "");

  const result = Number(secondNumber) + Number(firstNumber);

  return result;
};
