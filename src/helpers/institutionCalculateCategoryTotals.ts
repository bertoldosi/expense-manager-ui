import { CategoryType } from "@interfaces/*";

export type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
  selected?: boolean;
  institutionId?: string;
};

interface InstitutionType {
  shoppings: ShoppingType[];
}
function institutionCalculateCategoryTotals(
  institution: InstitutionType
): CategoryType[] {
  if (institution.shoppings?.length) {
    const categoryTotals: { [category: string]: number } =
      institution.shoppings.reduce((totals, shopping) => {
        const category = shopping.category;
        const amount = parseFloat(shopping.amount);

        if (totals[category]) {
          totals[category] += amount;
        } else {
          totals[category] = amount;
        }

        return totals;
      }, {});

    // Convert the categoryTotals object to an array of objects
    const categoryTotalsArray: CategoryType[] = Object.keys(categoryTotals).map(
      (category) => ({
        category,
        total: categoryTotals[category],
      })
    );

    return categoryTotalsArray;
  }

  return [];
}

export default institutionCalculateCategoryTotals;
