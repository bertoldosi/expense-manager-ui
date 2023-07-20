export type InstitutionType = {
  shoppings?: ShoppingType[] | null;
};

export type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
};

function institutionCalculateTotalAmountInstitution(
  institution: InstitutionType
): number {
  if (institution?.shoppings?.length) {
    const totalAmount = institution.shoppings.reduce(
      (sum, shopping) => sum + parseFloat(shopping.amount),
      0
    );

    return totalAmount;
  }

  return 0;
}
export default institutionCalculateTotalAmountInstitution;
