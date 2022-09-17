import { GET_MONTHS } from "../pages";
// import { monthsMock } from "../pages/monthsMock";
import { hygraph } from "../services/HygraphClient";
import { createNewInstitution } from "../services/request/createNewInstitution";
import { getInstitution } from "../services/request/getInstitution";
import { publishInstitution } from "../services/request/publishInstitution";
import { updateMonthInstitution } from "../services/request/updateMonthInstitution";

const monthsList = new Array();
const institutions = new Array();
const shoppings = new Array();

const monthsIds = new Array();
const institutionIds = new Array();
const shoppingIds = new Array();

const create = (months) => {
  months.map((month) => {
    monthsList.push(month);

    month.institutions.map(async (institution) => {
      const isInstitution = await getInstitution(institution.id);

      if (!isInstitution) {
        console.log(isInstitution);
        const newInstitution = await createNewInstitution(institution);

        institutions.push(newInstitution);
        await publishInstitution(newInstitution.id);
      }

      institution.shoppings.map((shopping) => {
        shoppings.push(shopping);
      });
    });
  });
};

export const salvarEmLote = (months) => {
  create(months);

  months.map((month) => {
    monthsIds.push(month.id);

    month.institutions.map((institution) => {
      institutionIds.push(institution.id);

      // updateMonthInstitution(month.id, institution.id);

      institution.shoppings.map((shopping) => {
        shoppingIds.push(shopping.id);
      });
    });
  });

  // console.log(months);
  // console.log(monthsIds);
  // console.log(institutionIds);
  // console.log(shoppingIds);
};
