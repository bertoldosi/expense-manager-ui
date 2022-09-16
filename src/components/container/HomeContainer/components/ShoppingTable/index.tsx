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
import { createShopping } from "../../../../../services/request/createShopping";
import { deleteShopping } from "../../../../../services/request/deleteShopping";
import { updateShopping } from "../../../../../services/request/updateShopping";

type PropsType = {
  shoppingList: ShoppingType[];
  institution: InstitutionType;
  institutionList: InstitutionType[];
  setInstitutionList: React.Dispatch<React.SetStateAction<InstitutionType[]>>;
};

const initialNewShopping = {
  id: uuidv4(),
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

  const onChangeInputAddShopping = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setNewShopping((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

  const onChangeInputUpdateShopping = (
    event: React.ChangeEvent<HTMLInputElement>,
    institutionId: string
  ) => {
    const { id, value, name } = event.target;

    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.id === institutionId) {
          return {
            ...institution,
            listResponsibleValues: sumAmountResponsible(institution),
            shoppings: institution.shoppings.map((shopping) => {
              if (shopping.id === id) {
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
    const description = newShopping.description
      ? newShopping.description
      : "SEM/DESC";
    const responsible = newShopping.responsible
      ? newShopping.responsible
      : "SEM/ATRIB";
    const amount = newShopping.amount ? newShopping.amount : "0";

    await createShopping(institutionId, {
      id: uuidv4(),
      description,
      responsible,
      amount,
    });

    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.id === institutionId) {
          return {
            ...institution,
            listResponsibleValues: sumAmountResponsible(institution),
            amount: sumAmountMoney(institution.amount, newShopping.amount),
            shoppings: [
              ...institution.shoppings,
              {
                ...newShopping,
                id: uuidv4(),
                description: description,
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
  };

  const removeShopping = async (
    institutionId: string,
    shopping: ShoppingType
  ) => {
    const shoppingId = shopping.id;

    deleteShopping(shoppingId).then(() => {
      setInstitutionList(
        institutionList.map((institution) => {
          if (institution.id === institutionId) {
            return {
              ...institution,
              shoppings: removingShopping(institution.shoppings, shoppingId),
              amount: subtractingValues(institution.amount, shopping),
            };
          } else {
            return institution;
          }
        })
      );
    });
  };

  const updateBuy = async (
    institutionId: string,
    shoppingUpdate: ShoppingType
  ) => {
    const shoppingId = shoppingUpdate.id;

    await updateShopping(shoppingUpdate);

    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.id === institutionId) {
          return {
            ...institution,
            listResponsibleValues: sumAmountResponsible(institution),
            shoppings: institution.shoppings.map((shopping) => {
              if (shopping.id === shoppingId) {
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
                    id={shopping.id}
                    value={shopping.description}
                    onChange={(event) => {
                      onChangeInputUpdateShopping(event, institution.id);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    name="amount"
                    id={shopping.id}
                    value={shopping.amount}
                    onChange={(event) => {
                      onChangeInputUpdateShopping(event, institution.id);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    name="responsible"
                    id={shopping.id}
                    value={shopping.responsible}
                    onChange={(event) => {
                      onChangeInputUpdateShopping(event, institution.id);
                    }}
                  />
                </td>

                <td className="content-btn">
                  {shopping.isUpdate && (
                    <button
                      onClick={() => {
                        updateBuy(institution.id, shopping);
                      }}
                    >
                      Salvar
                    </button>
                  )}

                  <button
                    onClick={() => {
                      removeShopping(institution.id, shopping);
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
                  id={newShopping.id}
                  value={newShopping.description}
                  onChange={onChangeInputAddShopping}
                  onKeyUp={() => {
                    includeShopping(institution.id);
                  }}
                />
              </td>
              <td>
                <InputTable
                  name="amount"
                  id={newShopping.id}
                  value={newShopping.amount}
                  onChange={onChangeInputAddShopping}
                  onKeyUp={() => {
                    includeShopping(institution.id);
                  }}
                />
              </td>
              <td colSpan={2}>
                <InputTable
                  name="responsible"
                  id={newShopping.id}
                  value={newShopping.responsible}
                  onChange={onChangeInputAddShopping}
                  onKeyUp={() => {
                    includeShopping(institution.id);
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
                      includeShopping(institution.id);
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
