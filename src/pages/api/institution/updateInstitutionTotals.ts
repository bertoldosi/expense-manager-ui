import calculateCategoryTotals from "@helpers/calculateCategoryTotals";
import calculateTotalAmountInstitution from "@helpers/calculateTotalAmountInstitution";

async function updateInstitutionTotals(institutionId: string) {
  const institution = await prisma.institution.findUnique({
    where: {
      id: institutionId,
    },
    include: {
      shoppings: true,
    },
  });

  if (!institution) {
    throw new Error("Institution not found");
  }

  const totalAmount = calculateTotalAmountInstitution(institution);
  const categoryTotals = calculateCategoryTotals(institution);

  try {
    await prisma.institution.update({
      where: {
        id: institutionId,
      },
      data: {
        totalAmount,
        categoryTotals: categoryTotals,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default updateInstitutionTotals;
