import { CategoryType, ExpenseType, InstitutionType } from "@interfaces/*";

interface FormattedExpenseType {
  id: string;
  name: string;
  totalAmount: { date: string; total: number }[];
  categoryTotals: { date: string; categoryTotals: CategoryType[] }[];
  createAt: Date;
  userId: string;
  institutions: InstitutionType[];
}

function expenseCalculateCategoryTotals(
  expense: ExpenseType
): FormattedExpenseType {
  const totalAmount: { date: string; total: number }[] = [];
  const categoryTotals: { date: string; categoryTotals: CategoryType[] }[] = [];

  // Helper function to find or create a date entry in the result arrays
  const findOrCreateDateEntry = (date: string) => {
    let entry = totalAmount.find((item) => item.date === date);
    if (!entry) {
      entry = { date, total: 0 };
      totalAmount.push(entry);
    }
    return entry;
  };

  // Helper function to find or create a categoryTotals entry in the result arrays
  const findOrCreateCategoryEntry = (date: string, category: string) => {
    let entry = categoryTotals.find((item) => item.date === date);
    if (!entry) {
      entry = { date, categoryTotals: [] };
      categoryTotals.push(entry);
    }
    let categoryItem = entry.categoryTotals.find(
      (cat) => cat.category === category
    );
    if (!categoryItem) {
      categoryItem = { category, total: 0 };
      entry.categoryTotals.push(categoryItem);
    }
    return categoryItem;
  };

  expense?.institutions?.forEach((institution: InstitutionType) => {
    const date = institution?.createAt;

    const totalAmountEntry = findOrCreateDateEntry(date);
    totalAmountEntry.total += institution?.totalAmount;

    institution?.categoryTotals?.forEach((category) => {
      const categoryItem = findOrCreateCategoryEntry(date, category.category);
      categoryItem.total += category.total;
    });
  });

  return {
    ...expense,
    totalAmount,
    categoryTotals,
  };
}

export default expenseCalculateCategoryTotals;
