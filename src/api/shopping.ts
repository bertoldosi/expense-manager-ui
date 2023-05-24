import { ShoppingType } from "@interfaces/*";
import instances from "src/lib/axios-instance-bff";

export const createShopping = async (
  institutionId: string,
  shopping: ShoppingType
) => {
  return instances.post("/shopping", { institutionId, shopping });
};