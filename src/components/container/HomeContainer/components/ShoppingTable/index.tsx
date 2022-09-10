import React from "react";
import { v4 as uuidv4 } from "uuid";

import { SsubTable, ScontentButton } from "./styles";

import InputTable from "../InputTable";
import ContentAmount from "../ContentAmount";
import { Button } from "../../../../common/Button";
import { maskMorney } from "../../../../../helpers/masks";
import { addingResponsibleAmount } from "../../../../../helpers/addingResponsibleAmount";
import { addingValues } from "../../../../../helpers/addingValues";
import { InstitutionType, ShoppingType } from "../../types";
import { removeBuy } from "../../../../../helpers/removeBuy";
import { subtractingValues } from "../../../../../helpers/subtractingValues";

type PropsType = {
  shoppingList: ShoppingType[];
  institution: InstitutionType;
  handlerInputChange: Function;
  institutionList: InstitutionType[];
  setInstitutionList: React.Dispatch<React.SetStateAction<InstitutionType[]>>;
};

const initialNewBuy = {
  id: uuidv4(),
  description: "",
  amount: "0",
  responsible: "",
};

export const ShoppingTable = ({
  shoppingList,
  institution,
  handlerInputChange,
  institutionList,
  setInstitutionList,
}: PropsType) => {
  const [newBuy, setNewBuy] = React.useState<ShoppingType>(initialNewBuy);

  const handleInputNewBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewBuy((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

  const handleIncludeNewBuy = (institutionId: string) => {
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
            listResponsibleValues: addingResponsibleAmount(institution),
            amount: addingValues(institution.amount, newBuy.amount),
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

    setNewBuy(initialNewBuy);
  };

  const handleRemoveBuy = (institutionId: string, shopping: ShoppingType) => {
    const shoppingId = shopping.id;

    setInstitutionList(
      institutionList.map((institution) => {
        if (institution.id === institutionId) {
          return {
            ...institution,
            shoppings: removeBuy(institution.shoppings, shoppingId),
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
          listResponsibleValues: addingResponsibleAmount(institution),
          amount: addingValues(institution.amount, newBuy.amount),
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
                      handlerInputChange(event, institution.id);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    name="amount"
                    id={shopping.id}
                    value={shopping.amount}
                    onChange={(event) => {
                      handlerInputChange(event, institution.id);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    name="responsible"
                    id={shopping.id}
                    value={shopping.responsible}
                    onChange={(event) => {
                      handlerInputChange(event, institution.id);
                    }}
                  />
                </td>

                <td className="content-btn">
                  <button
                    onClick={() => {
                      handleRemoveBuy(institution.id, shopping);
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
                  onChange={handleInputNewBuy}
                  onKeyUp={() => {
                    handleIncludeNewBuy(institution.id);
                  }}
                />
              </td>
              <td>
                <InputTable
                  name="amount"
                  id={newBuy.id}
                  value={newBuy.amount}
                  onChange={handleInputNewBuy}
                  onKeyUp={() => {
                    handleIncludeNewBuy(institution.id);
                  }}
                />
              </td>
              <td colSpan={2}>
                <InputTable
                  name="responsible"
                  id={newBuy.id}
                  value={newBuy.responsible}
                  onChange={handleInputNewBuy}
                  onKeyUp={() => {
                    handleIncludeNewBuy(institution.id);
                  }}
                />
              </td>
            </tr>

            <tr className="no-border">
              <td colSpan={4}>
                <ContentAmount
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
                    handleIncludeNewBuy(institution.id);
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
