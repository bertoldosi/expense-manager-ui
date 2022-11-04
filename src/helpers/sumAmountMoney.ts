export const sumAmountMoney = (
  firstNumber: number | string,
  secondNumber: number | string
) => {
  firstNumber = String(firstNumber).replace(".", "");
  firstNumber = String(firstNumber).replace(",", "");

  secondNumber = String(secondNumber).replace(".", "");
  secondNumber = String(secondNumber).replace(",", "");

  const result = Number(secondNumber) + Number(firstNumber);

  return result;
};
