interface Institution {}

interface ExpenseType {
  institutions: Institution[];
}

function expenseCalculateCategoryTotals(despesa: ExpenseType) {
  const totalAmount: any = [];
  const categoryTotals: { date: string; categoryTotals: any }[] = [];

  // Função auxiliar para encontrar ou criar uma entrada de data nos arrays de resultado
  const findOrCreateDateEntry = (date: string) => {
    let entry = totalAmount.find((item) => item.date === date);
    if (!entry) {
      entry = { date, total: 0 };
      totalAmount.push(entry);
    }
    return entry;
  };

  // Função auxiliar para encontrar ou criar uma entrada de categoryTotals nos arrays de resultado
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

  despesa?.institutions?.forEach((institution: any) => {
    const date = institution?.createAt;

    const totalAmountEntry = findOrCreateDateEntry(date);
    totalAmountEntry.total += institution?.totalAmount;

    institution?.categoryTotals?.forEach((category) => {
      const categoryItem = findOrCreateCategoryEntry(date, category.category);
      categoryItem.total += category.total;
    });
  });

  return {
    ...despesa,
    totalAmount,
    categoryTotals,
  };
}

export default expenseCalculateCategoryTotals;
