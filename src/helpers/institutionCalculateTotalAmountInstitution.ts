import { InstitutionType } from "@interfaces/*";

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
