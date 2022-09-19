import { ShoppingType } from "../components/container/HomeContainer/types";
import apiGateway from "../lib/axios-instance-local";

type Payload = {
  institutionId: string;
  shopping: ShoppingType;
};

export const createNewShopping = async (payload: Payload) => {
  return apiGateway.post("/api/shopping", payload);
};
