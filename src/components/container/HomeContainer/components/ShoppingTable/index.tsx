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

type PropsType = {
  shoppingList: ShoppingType[];
  institution: InstitutionType;
  handleInputChange: Function;
  listTable: InstitutionType[];
  setListTable: React.Dispatch<React.SetStateAction<InstitutionType[]>>;
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
  handleInputChange,
  listTable,
  setListTable,
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
    setListTable(
      listTable.map((institution) => {
        if (institution.id === institutionId) {
          const description = newBuy.description
            ? newBuy.description
            : "SEM/DESC";
          const responsible = newBuy.responsible
            ? newBuy.responsible
            : "SEM/ATRIB";

          return {
            ...institution,
            responsibleAmount: addingResponsibleAmount(institution),
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

  const handleRemoveBuy = (institutionId: string, shoppingId: string) => {
    setListTable(
      listTable.map((institution) => {
        if (institution.id === institutionId) {
          return {
            ...institution,
            shoppings: removeBuy(institution.shoppings, shoppingId),
          };
        } else {
          return institution;
        }
      })
    );

    console.log(listTable);
  };

  React.useEffect(() => {
    setListTable(
      listTable.map((institution) => {
        return {
          ...institution,
          responsibleAmount: addingResponsibleAmount(institution),
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
                      handleInputChange(event, institution.id);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    name="amount"
                    id={shopping.id}
                    value={shopping.amount}
                    onChange={(event) => {
                      handleInputChange(event, institution.id);
                    }}
                  />
                </td>
                <td>
                  <InputTable
                    name="responsible"
                    id={shopping.id}
                    value={shopping.responsible}
                    onChange={(event) => {
                      handleInputChange(event, institution.id);
                    }}
                  />
                </td>

                <td className="content-btn">
                  <button
                    onClick={() => {
                      handleRemoveBuy(institution.id, shopping.id);
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
                  responsibleList={institution.responsibleAmount}
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
