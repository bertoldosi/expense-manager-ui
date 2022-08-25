import React from "react";
import ContentAmount from "../ContentAmount";
import InputTable from "../InputTable";
import { v4 as uuidv4 } from "uuid";

import { SsubTable } from "./styles";

type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  responsible: string;
};

type PropsType = {
  shoppingList: ShoppingType[];
};

const initialNewBuy = {
  id: uuidv4(),
  description: "",
  amount: "",
  responsible: "",
};

export const ShoppingTable = ({ shoppingList }: PropsType) => {
  const [newBuy, setNewBuy] = React.useState<ShoppingType>(initialNewBuy);

  const [shoppingInputs, setShoppingInputs] =
    React.useState<ShoppingType[]>(shoppingList);

  const includeNewBuy = () => {
    const isFilled =
      newBuy.description != null && newBuy.amount != null && newBuy.responsible;

    if (isFilled) {
      setShoppingInputs((prevState) => {
        return [...prevState, newBuy];
      });

      setNewBuy(initialNewBuy);
    } else {
      alert("Precisa preencher todos os campos");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, name } = event.target;

    setShoppingInputs((prevState) => {
      const newShopping = prevState.map((shopping) => {
        if (shopping.id === id) {
          return {
            ...shopping,
            [name]: value,
          };
        } else {
          return shopping;
        }
      });

      return newShopping;
    });
  };

  const handleInputNewBuy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewBuy((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
            {shoppingInputs.map((shopping, index) => (
              <tr key={index}>
                <td>
                  <InputTable
                    name="description"
                    id={shopping.id}
                    value={shopping.description}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <InputTable
                    name="amount"
                    id={shopping.id}
                    value={shopping.amount}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <InputTable
                    name="responsible"
                    id={shopping.id}
                    value={shopping.responsible}
                    onChange={handleInputChange}
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
                />
              </td>
              <td>
                <InputTable
                  name="amount"
                  id={newBuy.id}
                  value={newBuy.amount}
                  onChange={handleInputNewBuy}
                />
              </td>
              <td>
                <InputTable
                  name="responsible"
                  id={newBuy.id}
                  value={newBuy.responsible}
                  onChange={handleInputNewBuy}
                />
              </td>
            </tr>

            <tr className="no-border">
              <td colSpan={3}>
                <ContentAmount />
              </td>
            </tr>
          </tbody>
        </SsubTable>

        <button onClick={includeNewBuy}>Incluir</button>
      </td>
    </tr>
  );
};
