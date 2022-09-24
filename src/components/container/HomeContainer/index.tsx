import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Scontainer, Stable } from "./styles";

import useTable from "../../../hooks/useTable";

import IconTable from "./components/IconTable";
import InputTable from "./components/InputTable";
import TableTotalAmount from "./components/TableTotalAmount";
import { ShoppingTable } from "./components/ShoppingTable";
import { formatMorney } from "../../../helpers/formatMorney";
import { maskDate } from "../../../helpers/masks";
import { InstitutionType, MonthType } from "./types";
import { createInstitution } from "../../../graphql/institution";
import { updateMonthInstitution } from "../../../graphql/month";

type PropsType = {
  nowMonth: Number;
  months: MonthType[];
};

const initialInputInstitution = {
  reference: uuidv4(),
  name: "",
  amount: "0,00",
  listResponsibleValues: [],
  expirationDate: "",
  shoppings: [],
};

function HomeContainer({ nowMonth, months }: PropsType) {
  const {
    handlerShoppingsExpanded,
    monthList,
    setMonthList,
    responsibleTotalAmountList,
  } = useTable(months, nowMonth);

  const [inputInstitution, setInputInstitution] =
    React.useState<InstitutionType>(initialInputInstitution);

  const onChangeInputInstitution = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setInputInstitution((prevState) => ({
      ...prevState,
      [name]: maskDate(value, name),
    }));
  };

  const includeNewInstitution = async (monthId: string) => {
    const isFilled =
      inputInstitution.name != "" &&
      inputInstitution.amount != "" &&
      inputInstitution.expirationDate != "";

    const newInstitution = { ...inputInstitution, reference: uuidv4() };

    const { reference: institutionReference } = await createInstitution(
      newInstitution
    );

    await updateMonthInstitution(monthId, institutionReference);

    if (isFilled) {
      setMonthList(
        monthList.map((monthMap) => {
          if (monthMap.id === monthId) {
            return {
              ...monthMap,
              institutions: [...monthMap.institutions, newInstitution],
            };
          } else {
            return monthMap;
          }
        })
      );

      setInputInstitution(initialInputInstitution);
    } else {
      alert("Precisa preencher todos os campos");
    }
  };

  if (monthList.length === 0) {
    return <h1>Carregadando....</h1>;
  }

  return (
    <>
      {monthList.map((month) => {
        return (
          month.mesNumber === nowMonth && (
            <Scontainer>
              <Stable>
                <thead>
                  <tr>
                    <th>Instituição</th>
                    <th>Total</th>
                    <th>Vencimento</th>
                  </tr>
                </thead>

                <tbody>
                  {month.institutions.map((institution, key) => {
                    return (
                      <>
                        <tr
                          key={key}
                          onClick={() => {
                            handlerShoppingsExpanded(
                              institution.reference,
                              month.id
                            );
                          }}
                        >
                          <td>
                            <IconTable item={institution} />
                          </td>
                          <td>{formatMorney(institution.amount)}</td>
                          <td>{institution.expirationDate}</td>
                        </tr>

                        {institution.isShowShoppings && (
                          <ShoppingTable
                            shoppingList={institution.shoppings}
                            institution={institution}
                            month={month}
                            monthList={monthList}
                            setMonthList={setMonthList}
                          />
                        )}
                      </>
                    );
                  })}

                  <tr>
                    <td>
                      <InputTable
                        name="name"
                        id={inputInstitution.reference}
                        value={inputInstitution.name}
                        onChange={onChangeInputInstitution}
                        onKeyUp={() => {
                          includeNewInstitution(month.id);
                        }}
                      />
                    </td>
                    <td>
                      <InputTable
                        name="amount"
                        id={inputInstitution.reference}
                        value={inputInstitution.amount}
                        onChange={onChangeInputInstitution}
                        onKeyUp={() => {
                          includeNewInstitution(month.id);
                        }}
                        disabled
                      />
                    </td>
                    <td>
                      <InputTable
                        name="expirationDate"
                        id={inputInstitution.reference}
                        value={inputInstitution.expirationDate}
                        onChange={onChangeInputInstitution}
                        onKeyUp={() => {
                          includeNewInstitution(month.id);
                        }}
                        type="date"
                      />
                    </td>
                  </tr>
                </tbody>
              </Stable>

              <TableTotalAmount
                listResponsibleValues={responsibleTotalAmountList}
              />
            </Scontainer>
          )
        );
      })}
    </>
  );
}

export default HomeContainer;
