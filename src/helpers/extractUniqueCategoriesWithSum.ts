import { InstitutionType } from "@interfaces/*";

function extractUniqueCategoriesWithSum(
  institution: InstitutionType
): { category: string; total: number }[] {
  const categorias: { [category: string]: number } = {};

  if (institution.shoppings) {
    institution.shoppings.forEach((shopping) => {
      const { category, amount } = shopping;
      if (categorias[category]) {
        categorias[category] += Number(amount);
      } else {
        categorias[category] = Number(amount);
      }
    });
  }

  const categoriasUnicas = Object.keys(categorias).map((category) => ({
    category,
    total: categorias[category],
  }));

  return categoriasUnicas;
}

export default extractUniqueCategoriesWithSum;
