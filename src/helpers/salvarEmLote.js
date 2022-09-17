import { GET_MONTHS } from "../pages";
import { v4 as uuidv4 } from "uuid";

// import { monthsMock } from "../pages/monthsMock";
import { hygraph } from "../services/HygraphClient";
import { createNewInstitution } from "../services/request/createNewInstitution";
import { createShopping } from "../services/request/createShopping";
import { getInstitution } from "../services/request/getInstitution";
import { getShopping } from "../services/request/getShopping";
import { publishInstitution } from "../services/request/publishInstitution";
import { updateMonthInstitution } from "../services/request/updateMonthInstitution";

const create = async (institution) => {
  institution.shoppings.map(async (shopping) => {
    const isShopping = await getShopping(shopping.reference);

    if (!isShopping.reference) {
      await createShopping(institution.reference, {
        ...shopping,
        reference: uuidv4(),
      });
    }
  });
};

export const salvarEmLote = async (institution) => {
  await create(institution);

  return;
};
