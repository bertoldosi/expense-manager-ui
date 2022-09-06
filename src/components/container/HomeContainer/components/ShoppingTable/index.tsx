import React from "react";
import { v4 as uuidv4 } from "uuid";

import { SsubTable, ScontentButton } from "./styles";

import InputTable from "../InputTable";
import ContentAmount from "../ContentAmount";
import { Button } from "../../../../common/Button";
import { maskMorney } from "../../../../../helpers/masks";
import { addingResponsibleAmount } from "../../../../../helpers/addingResponsibleAmount";
import { addingValues } from "../../../../../helpers/addingValues";

type ShoppingType = {
  id: string;
  description: string;
  amount: string | number;
  responsible: string;
};

type ResponsibleAmountType = {
  name: string;
  amount: string | number;
};

type InstitutionType = {
  id: string;
  name: string;
  amount: string | number;
  responsibleAmount: ResponsibleAmountType[];
  expirationDate: string;
  shoppings: ShoppingType[];
};

type PropsType = {
  shoppingList: ShoppingType[];
  institution: InstitutionType;
  handleInputChange: Function;
  listTable: InstitutionType[];
  setListTable: React.Dispatch<React.SetStateAction<InstitutionType[]>>;
};

const initialNewBuy = {
  id: uuidv4(),
  description: "VAZIO",
  amount: "0",
  responsible: "VAZIO",
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
          return {
            ...institution,
            responsibleAmount: addingResponsibleAmount(institution),
            amount: addingValues(institution.amount, newBuy.amount),
            shoppings: [...institution.shoppings, { ...newBuy, id: uuidv4() }],
          };
        } else {
          return institution;
        }
      })
    );

    setNewBuy(initialNewBuy);
  };

  return (
    <tr>
      <td colSpan={3}>
        <SsubTable>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Total</th>
              <th>Responsável</th>
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
              </tr>
            ))}

            <tr>
              <td>
                <InputTable
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
              <td>
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
              <td colSpan={3}>
                <ContentAmount
                  responsibleList={institution.responsibleAmount}
                />
              </td>
            </tr>
          </tbody>
          <tr className="no-border">
            <td colSpan={3}>
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
