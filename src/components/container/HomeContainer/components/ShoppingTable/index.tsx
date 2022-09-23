import React from "react";
import { v4 as uuidv4 } from "uuid";

import { SsubTable, ScontentButton } from "./styles";

import InputTable from "../InputTable";
import TableTotalAmount from "../TableTotalAmount";
import { Button } from "../../../../common/Button";
import { maskMorney } from "../../../../../helpers/masks";
import { sumAmountResponsible } from "../../../../../helpers/sumAmountResponsible";
import { InstitutionType, MonthType, ShoppingType } from "../../types";
import { removingShopping } from "../../../../../helpers/removingShopping";
import { subtractingValues } from "../../../../../helpers/subtractingValues";
import { updateAmountShoppings } from "../../../../../helpers/updateAmountShoppings";
import { sumAmountMoney } from "../../../../../helpers/sumAmountMoney";
import { deleteShopping } from "../../../../../graphql/shopping";
import { updateShopping as upShopping } from "../../../../../graphql/shopping";
import { createShopping } from "../../../../../graphql/shopping";
import {
  createInstitutionShoppings,
  updateInstitutionShopping,
  updateInstitutionShoppings,
} from "../../../../../graphql/institution";
import { focusInput } from "../../../../../helpers/focusInput";
import { Trash } from "../../../../icons/Trash";
import { Save } from "../../../../icons/Save";
import {
  getMonthNumber,
  updateMonthInstitution,
} from "../../../../../graphql/month";

type PropsType = {
  shoppingList: ShoppingType[];
  institution: InstitutionType;
  month: MonthType;
  monthList: MonthType[];
  setMonthList: Function;
};

const initialNewShopping = {
  reference: uuidv4(),
  description: "",
  amount: "",
  responsible: "",
  repeat: false,
};

export const ShoppingTable = ({
  shoppingList,
  institution,
  month,
  monthList,
  setMonthList,
}: PropsType) => {
  const [newShopping, setNewShopping] =
    React.useState<ShoppingType>(initialNewShopping);

  const [request, setRequest] = React.useState(false);

  const onChangeAddShopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewShopping((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

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

  const includeShopping = async (institutionReference: string) => {
    setRequest(true);

    const responsible = newShopping.responsible
      ? newShopping.responsible
      : "SEM/ATRIB";

    const isFilled = newShopping.description != "" && newShopping.amount != "";
    const shopping = {
      ...newShopping,
      reference: uuidv4(),
      responsible,
    };

    if (isFilled) {
      createShopping(shopping).then(({ reference: shoppingReference }) => {
        updateInstitutionShopping(
          institutionReference,
          shoppingReference
        ).finally(() => {
          setMonthList(
            monthList.map((monthMap) => {
              if (monthMap.id === month.id) {
                return {
                  ...monthMap,
                  institutions: monthMap.institutions.map((institutionMap) => {
                    if (institutionMap.reference === institutionReference) {
                      return {
                        ...institutionMap,
                        listResponsibleValues:
                          sumAmountResponsible(institutionMap),
                        amount: sumAmountMoney(
                          institutionMap.amount,
                          newShopping.amount
                        ),
                        shoppings: [
                          ...institutionMap.shoppings,
                          {
                            ...newShopping,
                            reference: uuidv4(),
                            responsible: responsible,
                          },
                        ],
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

          setNewShopping(initialNewShopping);
          setRequest(false);
          focusInput();
        });
      });
    } else {
      alert("Precisa preencher descrição e valor!");
      setRequest(false);
    }
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

  const repeatInstitution = async () => {
    const { id: monthId, institutions } = await getMonthNumber(
      month.mesNumber + 1
    );

    const isInstitutionRepeat =
      institution.shoppings.filter((shopping) => shopping.repeat).length > 0;

    if (isInstitutionRepeat) {
      const institutionsFilter = institutions.filter(
        (institutionFilter: InstitutionType) =>
          institutionFilter.name === institution.name
      );

      const notInstitutionCreated = institutionsFilter.length === 0;

      if (notInstitutionCreated) {
        if (monthId) {
          const institutionRepeat = {
            ...institution,
            reference: uuidv4(),
            shoppings: institution.shoppings.filter(
              (shopping) => shopping.repeat
            ),
          };

          setMonthList(
            monthList.map((monthMap) => {
              if (monthMap.id === month.id) {
                return {
                  ...monthMap,
                  institutions: [...monthMap.institutions, institutionRepeat],
                };
              } else {
                return monthMap;
              }
            })
          );

          const { reference: institutionReference } =
            await createInstitutionShoppings(institutionRepeat);
          await updateMonthInstitution(monthId, institutionReference);
        } else {
          alert("Mês não encontrado!");
        }
      } else {
        const shoppingsRepeat = institution.shoppings.filter(
          (shopping) => shopping.repeat
        );

        const institutionReference = institutions[0].reference;

        setMonthList(
          monthList.map((monthMap) => {
            if (monthMap.id === month.id) {
              return {
                ...monthMap,
                institutions: monthMap.institutions.map((institutionMap) => {
                  if (institutionMap.reference === institutionReference) {
                    return {
                      ...institutionMap,
                      shoppings: [
                        ...institutionMap.shoppings,
                        [...shoppingsRepeat],
                      ],
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

        await updateInstitutionShoppings(institutionReference, shoppingsRepeat);
      }
    } else {
      alert("Marque as compras que deseja reperir para o próximo mês!");
    }
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
  }, [shoppingList]);

  return (
    <tr>
      <td colSpan={3}>
        <SsubTable>
          <thead>
            <tr>
              <th className="center">#</th>
              <th>Descrição</th>
              <th>Total</th>
              <th>Responsável</th>
              <th className="center">#</th>
            </tr>
          </thead>

          <tbody>
            {shoppingList.map((shopping, index) => (
              <tr key={index}>
                <td className="center">
                  <InputTable
                    type="checkbox"
                    disabled={request}
                    name="repeat"
                    id={shopping.reference}
                    checked={shopping.repeat}
                    onChange={(event) => {
                      onChangeUpdateRepeatShopping(
                        event,
                        institution.reference
                      );
                    }}
                  />
                </td>

                <td>
                  <InputTable
                    disabled={request}
                    name="description"
                    id={shopping.reference}
                    value={shopping.description}
                    onChange={(event) => {
                      onChangeUpdateShopping(event, institution.reference);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    disabled={request}
                    name="amount"
                    id={shopping.reference}
                    value={shopping.amount}
                    onChange={(event) => {
                      onChangeUpdateShopping(event, institution.reference);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    disabled={request}
                    name="responsible"
                    id={shopping.reference}
                    value={shopping.responsible}
                    onChange={(event) => {
                      onChangeUpdateShopping(event, institution.reference);
                    }}
                  />
                </td>

                <td className="center">
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
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={2}>
                <InputTable
                  autofocus
                  name="description"
                  id={newShopping.reference}
                  value={newShopping.description}
                  onChange={onChangeAddShopping}
                  onKeyUp={() => {
                    includeShopping(institution.reference);
                  }}
                />
              </td>
              <td>
                <InputTable
                  disabled={request}
                  name="amount"
                  id={newShopping.reference}
                  value={newShopping.amount}
                  onChange={onChangeAddShopping}
                  onKeyUp={() => {
                    includeShopping(institution.reference);
                  }}
                />
              </td>
              <td colSpan={2}>
                <InputTable
                  disabled={request}
                  name="responsible"
                  id={newShopping.reference}
                  value={newShopping.responsible}
                  onChange={onChangeAddShopping}
                  onKeyUp={() => {
                    includeShopping(institution.reference);
                  }}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={6}>
                <ScontentButton>
                  <Button
                    disabled={request}
                    backgroundColor="#333"
                    color="#fff"
                    onClick={repeatInstitution}
                  >
                    Repetir
                  </Button>
                  <Button
                    disabled={request}
                    backgroundColor="#FFF"
                    color="#333"
                    onClick={() => {
                      includeShopping(institution.reference);
                    }}
                  >
                    Adicionar
                  </Button>
                </ScontentButton>
              </td>
            </tr>

            <tr className="no-border">
              <td colSpan={6}>
                <TableTotalAmount
                  listResponsibleValues={institution.listResponsibleValues}
                />
              </td>
            </tr>
          </tbody>
        </SsubTable>
      </td>
    </tr>
  );
};
