import React from "react";
import { v4 as uuidv4 } from "uuid";

import { SsubTable, ScontentButton } from "./styles";

import InputTable from "../InputTable";
import TableTotalAmount from "../TableTotalAmount";
import { Button } from "../../../../common/Button";
import { maskMorney } from "../../../../../helpers/masks";
import { sumAmountResponsible } from "../../../../../helpers/sumAmountResponsible";
import { InstitutionType, ShoppingType } from "../../types";
import { removingBuy } from "../../../../../helpers/removingBuy";
import { subtractingValues } from "../../../../../helpers/subtractingValues";
import { updateAmountShoppings } from "../../../../../helpers/updateAmountShoppings";
import { sumAmountMoney } from "../../../../../helpers/sumAmountMoney";
import { createShopping } from "../../../../../services/request/createShopping";

type PropsType = {
  shoppingList: ShoppingType[];
  institution: InstitutionType;
  institutionList: InstitutionType[];
  setInstitutionList: React.Dispatch<React.SetStateAction<InstitutionType[]>>;
};

const initialNewBuy = {
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
  const [newBuy, setNewBuy] = React.useState<ShoppingType>(initialNewBuy);

  const onChangeInputAddBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewBuy((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

  const onChangeInputUpdateBuy = (
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

  const includeNewBuy = async (institutionId: string) => {
    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.id === institutionId) {
          const description = newBuy.description
            ? newBuy.description
            : "SEM/DESC";
          const responsible = newBuy.responsible
            ? newBuy.responsible
            : "SEM/ATRIB";

          return {
            ...institution,
            listResponsibleValues: sumAmountResponsible(institution),
            amount: sumAmountMoney(institution.amount, newBuy.amount),
            shoppings: [
              ...institution.shoppings,
              {
                ...newBuy,
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

    await createShopping(institutionId, newBuy);
    setNewBuy(initialNewBuy);
  };

  const removeBuy = (institutionId: string, shopping: ShoppingType) => {
    const shoppingId = shopping.id;

    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.id === institutionId) {
          return {
            ...institution,
            shoppings: removingBuy(institution.shoppings, shoppingId),
            amount: subtractingValues(institution.amount, shopping),
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
              <th>Descrição</th>
              <th>Total</th>
              <th>Responsável</th>
              <th>#</th>
            </tr>
          </thead>

          <tbody>
            {shoppingList.map((shopping, index) => (
              <tr key={index}>
                <td>
                  <InputTable
                    name="description"
                    id={shopping.id}
                    value={shopping.description}
                    onChange={(event) => {
                      onChangeInputUpdateBuy(event, institution.id);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    name="amount"
                    id={shopping.id}
                    value={shopping.amount}
                    onChange={(event) => {
                      onChangeInputUpdateBuy(event, institution.id);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    name="responsible"
                    id={shopping.id}
                    value={shopping.responsible}
                    onChange={(event) => {
                      onChangeInputUpdateBuy(event, institution.id);
                    }}
                  />
                </td>

                <td className="content-btn">
                  <button
                    onClick={() => {
                      removeBuy(institution.id, shopping);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td>
                <InputTable
                  autofocus
                  name="description"
                  id={newBuy.id}
                  value={newBuy.description}
                  onChange={onChangeInputAddBuy}
                  onKeyUp={() => {
                    includeNewBuy(institution.id);
                  }}
                />
              </td>
              <td>
                <InputTable
                  name="amount"
                  id={newBuy.id}
                  value={newBuy.amount}
                  onChange={onChangeInputAddBuy}
                  onKeyUp={() => {
                    includeNewBuy(institution.id);
                  }}
                />
              </td>
              <td colSpan={2}>
                <InputTable
                  name="responsible"
                  id={newBuy.id}
                  value={newBuy.responsible}
                  onChange={onChangeInputAddBuy}
                  onKeyUp={() => {
                    includeNewBuy(institution.id);
                  }}
                />
              </td>
            </tr>

            <tr className="no-border">
              <td colSpan={4}>
                <TableTotalAmount
                  listResponsibleValues={institution.listResponsibleValues}
                />
              </td>
            </tr>
          </tbody>
          <tr className="no-border">
            <td colSpan={4}>
              <ScontentButton>
                <Button
                  backgroundColor="#FFF"
                  color="#333"
                  onClick={() => {
                    includeNewBuy(institution.id);
                  }}
                >
                  Salvar
                </Button>
              </ScontentButton>
            </td>
          </tr>
        </SsubTable>
      </td>
    </tr>
  );
};
