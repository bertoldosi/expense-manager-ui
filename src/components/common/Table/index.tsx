import React from "react";
import { updateShopping as upShopping } from "../../../graphql/shopping";
import { deleteShopping } from "../../../graphql/shopping";
import { maskMorney } from "../../../helpers/masks";
import { removingShopping } from "../../../helpers/removingShopping";
import { subtractingValues } from "../../../helpers/subtractingValues";
import { sumAmountResponsible } from "../../../helpers/sumAmountResponsible";
import { updateAmountShoppings } from "../../../helpers/updateAmountShoppings";

import { Save } from "../../icons/Save";
import { Trash } from "../../icons/Trash";
import InputTable from "../InputTable";

import { Scontent } from "./styles";

import {
  InstitutionType,
  MonthType,
  ShoppingType,
} from "../../containers/HomeContainer/types";

type PropsType = {
  institution: InstitutionType;
  month: MonthType;
  monthList: MonthType[];
  setMonthList: Function;
  request: boolean;
  setRequest: Function;
};

export const Table = ({
  institution,
  month,
  monthList,
  setMonthList,
  request,
  setRequest,
}: PropsType) => {
  const onChangeUpdateShopping = (
    event: React.ChangeEvent<HTMLInputElement>,
    institutionReference: string
  ) => {
    const { id, value, name } = event.target;

    setMonthList(
      monthList.map((monthMap) => {
        if (monthMap.id === month.id) {
          return {
            ...monthMap,
            institutions: monthMap.institutions.map((institutionMap) => {
              if (institutionMap.reference === institutionReference) {
                return {
                  ...institutionMap,
                  listResponsibleValues: sumAmountResponsible(institutionMap),
                  shoppings: institutionMap.shoppings.map((shoppingMap) => {
                    if (shoppingMap.reference === id) {
                      return {
                        ...shoppingMap,
                        [name]: maskMorney(value, name),
                        isUpdate: true,
                      };
                    } else {
                      return shoppingMap;
                    }
                  }),
                };
              } else {
                return institutionMap;
              }
            }),
          };
        } else {
          return monthMap;
        }
      })
    );
  };

  const onChangeUpdateRepeatShopping = (
    event: React.ChangeEvent<HTMLInputElement>,
    institutionReference: string
  ) => {
    const { id, checked, name } = event.target;

    setMonthList(
      monthList.map((monthMap) => {
        if (monthMap.id === month.id) {
          return {
            ...monthMap,
            institutions: monthMap.institutions.map((institutionMap) => {
              if (institutionMap.reference === institutionReference) {
                return {
                  ...institutionMap,
                  shoppings: institutionMap.shoppings.map((shoppingMap) => {
                    if (shoppingMap.reference === id) {
                      return {
                        ...shoppingMap,
                        [name]: checked,
                      };
                    } else {
                      return shoppingMap;
                    }
                  }),
                };
              } else {
                return institutionMap;
              }
            }),
          };
        } else {
          return monthMap;
        }
      })
    );
  };

  const removeShopping = async (
    institutionReference: string,
    shopping: ShoppingType
  ) => {
    setRequest(true);
    const shoppingReference = shopping.reference;

    deleteShopping(shoppingReference).finally(() => {
      setMonthList(
        monthList.map((monthMap) => {
          if (monthMap.id === month.id) {
            return {
              ...monthMap,
              institutions: monthMap.institutions.map((institutionMap) => {
                if (institutionMap.reference === institutionReference) {
                  return {
                    ...institutionMap,
                    shoppings: removingShopping(
                      institutionMap.shoppings,
                      shoppingReference
                    ),
                    amount: subtractingValues(institutionMap.amount, shopping),
                  };
                } else {
                  return institutionMap;
                }
              }),
            };
          } else {
            return monthMap;
          }
        })
      );

      setRequest(false);
    });
  };

  const updateShopping = async (
    institutionReference: string,
    shoppingUpdate: ShoppingType
  ) => {
    setRequest(true);
    const shoppingReference = shoppingUpdate.reference;

    upShopping(shoppingUpdate).finally(() => {
      setMonthList(
        monthList.map((monthMap) => {
          if (monthMap.id === month.id) {
            return {
              ...monthMap,
              institutions: monthMap.institutions.map((institutionMap) => {
                if (institutionMap.reference === institutionReference) {
                  return {
                    ...institutionMap,
                    listResponsibleValues: sumAmountResponsible(institutionMap),
                    shoppings: institutionMap.shoppings.map((shoppingMap) => {
                      if (shoppingMap.reference === shoppingReference) {
                        return {
                          ...shoppingUpdate,
                          isUpdate: false,
                        };
                      } else {
                        return shoppingMap;
                      }
                    }),
                  };
                } else {
                  return institutionMap;
                }
              }),
            };
          } else {
            return monthMap;
          }
        })
      );

      setRequest(false);
    });
  };

  React.useEffect(() => {
    setMonthList(
      monthList.map((monthMap) => {
        if (monthMap.id === month.id) {
          return {
            ...monthMap,
            institutions: monthMap.institutions.map((institutionMap) => {
              return {
                ...institutionMap,
                listResponsibleValues: sumAmountResponsible(institutionMap),
                amount: updateAmountShoppings(institutionMap.shoppings),
              };
            }),
          };
        } else {
          return monthMap;
        }
      })
    );
  }, [institution.shoppings]);

  return (
    <Scontent>
      {institution.shoppings.map((shopping, index) => (
        <span key={index}>
          <strong>
            <InputTable
              type="checkbox"
              disabled={request}
              name="repeat"
              id={shopping.reference}
              checked={shopping.repeat}
              onChange={(event) => {
                onChangeUpdateRepeatShopping(event, institution.reference);
              }}
            />
            <InputTable
              disabled={request}
              name="description"
              id={shopping.reference}
              value={shopping.description}
              onKeyUp={() => {
                updateShopping(institution.reference, shopping);
              }}
              onChange={(event) => {
                onChangeUpdateShopping(event, institution.reference);
              }}
            />
          </strong>
          <strong>
            <InputTable
              disabled={request}
              name="amount"
              id={shopping.reference}
              value={shopping.amount}
              onKeyUp={() => {
                updateShopping(institution.reference, shopping);
              }}
              onChange={(event) => {
                onChangeUpdateShopping(event, institution.reference);
              }}
            />
          </strong>
          <strong>
            <InputTable
              disabled={request}
              name="responsible"
              id={shopping.reference}
              value={shopping.responsible}
              onKeyUp={() => {
                updateShopping(institution.reference, shopping);
              }}
              onChange={(event) => {
                onChangeUpdateShopping(event, institution.reference);
              }}
            />
          </strong>
          <strong>
            {shopping.isUpdate ? (
              <Save
                width={20}
                height={20}
                disabled={request}
                onClick={() => {
                  updateShopping(institution.reference, shopping);
                }}
              />
            ) : (
              <Trash
                width={20}
                height={20}
                disabled={request}
                onClick={() => {
                  removeShopping(institution.reference, shopping);
                }}
              />
            )}
          </strong>
        </span>
      ))}
    </Scontent>
  );
};
