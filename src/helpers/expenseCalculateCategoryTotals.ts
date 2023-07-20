interface TotalAmount {
  date: string;
  total: number;
}

interface CategoryTotals {
  category: string;
  total: number;
}

interface Institution {
  createAt: string;
  totalAmount: number;
  categoryTotals: CategoryTotals[];
}

interface FormattedExpenseType {
  id: string;
  name: string;
  totalAmount: TotalAmount[];
  categoryTotals: { date: string; categoryTotals: CategoryTotals[] }[];
  createAt: Date;
  userId: string;
  institutions: Institution[];
}

function expenseCalculateCategoryTotals(
  expense: FormattedExpenseType
): FormattedExpenseType {
  const totalAmount: TotalAmount[] = [];
  const categoryTotals: { date: string; categoryTotals: CategoryTotals[] }[] =
    [];

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

  expense?.institutions?.forEach((institution: Institution) => {
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
