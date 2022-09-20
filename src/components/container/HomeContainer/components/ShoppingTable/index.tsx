import React from "react";
import { v4 as uuidv4 } from "uuid";

import { SsubTable, ScontentButton } from "./styles";

import InputTable from "../InputTable";
import TableTotalAmount from "../TableTotalAmount";
import { Button } from "../../../../common/Button";
import { maskMorney } from "../../../../../helpers/masks";
import { sumAmountResponsible } from "../../../../../helpers/sumAmountResponsible";
import { InstitutionType, ShoppingType } from "../../types";
import { removingShopping } from "../../../../../helpers/removingShopping";
import { subtractingValues } from "../../../../../helpers/subtractingValues";
import { updateAmountShoppings } from "../../../../../helpers/updateAmountShoppings";
import { sumAmountMoney } from "../../../../../helpers/sumAmountMoney";
import { deleteShopping } from "../../../../../graphql/shopping";
import { updateShopping as upShopping } from "../../../../../graphql/shopping";
import { createShopping } from "../../../../../graphql/shopping";
import { updateInstitutionShopping } from "../../../../../graphql/institution";

type PropsType = {
  shoppingList: ShoppingType[];
  institution: InstitutionType;
  institutionList: InstitutionType[];
  setInstitutionList: React.Dispatch<React.SetStateAction<InstitutionType[]>>;
};

const initialNewShopping = {
  reference: uuidv4(),
  description: "",
  amount: "",
  responsible: "",
};

export const ShoppingTable = ({
  shoppingList,
  institution,
  institutionList,
  setInstitutionList,
}: PropsType) => {
  const [newShopping, setNewShopping] =
    React.useState<ShoppingType>(initialNewShopping);

  const onChangeAddShopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewShopping((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

  const onChangeUpdateShopping = (
    event: React.ChangeEvent<HTMLInputElement>,
    institutionId: string
  ) => {
    const { id, value, name } = event.target;

    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.reference === institutionId) {
          return {
            ...institution,
            listResponsibleValues: sumAmountResponsible(institution),
            shoppings: institution.shoppings.map((shopping) => {
              if (shopping.reference === id) {
                return {
                  ...shopping,
                  [name]: maskMorney(value, name),
                  isUpdate: true,
                };
              } else {
                return shopping;
              }
            }),
          };
        } else {
          return institution;
        }
      })
    );
  };

  const includeShopping = async (institutionId: string) => {
    const responsible = newShopping.responsible
      ? newShopping.responsible
      : "SEM/ATRIB";

    const isFilled = newShopping.description != "" && newShopping.amount != "";

    const shopping = {
      ...newShopping,
      reference: uuidv4(),
      responsible,
    };

    const { reference: shoppingReference } = await createShopping(shopping);
    await updateInstitutionShopping(institutionId, shoppingReference);

    if (isFilled) {
      setInstitutionList(
        institutionList.map((institution) => {
          if (institution.reference === institutionId) {
            return {
              ...institution,
              listResponsibleValues: sumAmountResponsible(institution),
              amount: sumAmountMoney(institution.amount, newShopping.amount),
              shoppings: [
                ...institution.shoppings,
                {
                  ...newShopping,
                  reference: uuidv4(),
                  responsible: responsible,
                },
              ],
            };
          } else {
            return institution;
          }
        })
      );

      setNewShopping(initialNewShopping);
    } else {
      alert("Precisa preencher descrição e valor!");
    }
  };

  const removeShopping = async (
    institutionId: string,
    shopping: ShoppingType
  ) => {
    const shoppingReference = shopping.reference;

    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.reference === institutionId) {
          return {
            ...institution,
            shoppings: removingShopping(
              institution.shoppings,
              shoppingReference
            ),
            amount: subtractingValues(institution.amount, shopping),
          };
        } else {
          return institution;
        }
      })
    );

    await deleteShopping(shoppingReference);
  };

  const updateShopping = async (
    institutionId: string,
    shoppingUpdate: ShoppingType
  ) => {
    const shoppingReference = shoppingUpdate.reference;

    await upShopping(shoppingUpdate);

    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.reference === institutionId) {
          return {
            ...institution,
            listResponsibleValues: sumAmountResponsible(institution),
            shoppings: institution.shoppings.map((shopping) => {
              if (shopping.reference === shoppingReference) {
                return {
                  ...shoppingUpdate,
                  isUpdate: false,
                };
              } else {
                return shopping;
              }
            }),
          };
        } else {
          return institution;
        }
      })
    );
  };

  React.useEffect(() => {
    setInstitutionList(
      institutionList.map((institution) => {
        return {
          ...institution,
          listResponsibleValues: sumAmountResponsible(institution),
          amount: updateAmountShoppings(institution.shoppings),
        };
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
                <td className="center">{index + 1}</td>

                <td>
                  <InputTable
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
                    name="responsible"
                    id={shopping.reference}
                    value={shopping.responsible}
                    onChange={(event) => {
                      onChangeUpdateShopping(event, institution.reference);
                    }}
                  />
                </td>

                <td className="content-btn">
                  {shopping.isUpdate && (
                    <button
                      onClick={() => {
                        updateShopping(institution.reference, shopping);
                      }}
                    >
                      Salvar
                    </button>
                  )}

                  <button
                    onClick={() => {
                      removeShopping(institution.reference, shopping);
                    }}
                  >
                    Remove
                  </button>
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
              <td colSpan={5}>
                <ScontentButton>
                  <Button
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
              <td colSpan={5}>
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
