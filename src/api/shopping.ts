import apiGateway from "../lib/axios-instance-local";

export const GetShopping = async () => {
  return apiGateway.get("/api/shopping");
};
