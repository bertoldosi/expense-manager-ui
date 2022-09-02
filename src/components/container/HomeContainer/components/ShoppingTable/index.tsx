import React from "react";

import { SsubTable, ScontentButton } from "./styles";

import InputTable from "../InputTable";
import ContentAmount from "../ContentAmount";
import { Button } from "../../../../common/Button";

type ShoppingType = {
  id: string;
  description: string;
  amount: string | number;
  responsible: string;
};

type ResponsibleAmountType = {
  name: string;
  amount: string;
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
  handleIncludeNewBuy: Function;
  handleInputNewBuy: React.ChangeEventHandler<HTMLInputElement>;
  newBuy: ShoppingType;
  handleInputChange: Function;
};

export const ShoppingTable = ({
  shoppingList,
  institution,
  handleIncludeNewBuy,
  handleInputNewBuy,
  newBuy,
  handleInputChange,
}: PropsType) => {
  console.log(institution);
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
                <ContentAmount responsibleList={[]} />
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
