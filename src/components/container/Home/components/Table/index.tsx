import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Save } from "@icons/Save";
import { HeaderTable } from "../HeaderTable";
import { maskMorney } from "@helpers/masks";
import { deleteShopping } from "@graphqls/shopping";
import { SelectStatus } from "@commons/SelectStatus";
import InputTable from "@containers/Home/components/InputTable";
import { updateShopping as upShopping } from "@graphqls/shopping";
import { getMonthNumber, updateMonthInstitution } from "@graphqls/month";

import {
  InstitutionType,
  MonthType,
  ShoppingType,
} from "@containers/Home/types";

import {
  createInstitutionShoppings,
  updateInstitutionShoppings,
} from "@graphqls/institution";

import { NoResult, Scontent } from "./styles";
import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { customToast } from "@helpers/customToast";
import { UserContext, UserContextType } from "src/context/userContext";

type PropsType = {
  institution: InstitutionType;
  month: MonthType;
  request: boolean;
  setRequest: Function;
};

const initialNewShopping = {
  responsible: "",
  status_paid: "aberto",
  select: false,
};

export const Table = ({
  institution,
  month,
  request,
  setRequest,
}: PropsType) => {
  const { getMonths } = React.useContext(UserContext) as UserContextType;

  const [valueFilter, setValueFilter] = React.useState("todos");
  const [shoppings, setShoppings] = React.useState<ShoppingType[]>([]);
  const [isItensSelect, setIsItensSelect] = React.useState(false);
  const [isRequest, setIsRequest] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [newShopping, setNewShopping] = React.useState(initialNewShopping);

  const onChangeUpdateShopping = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value, name } = event.target;

    setShoppings(
      shoppings.map((shoppingMap) => {
        if (shoppingMap.reference === id) {
          return {
            ...shoppingMap,
            [name]: maskMorney(value, name),
            isUpdate: true,
          };
        } else {
          return shoppingMap;
        }
      })
    );
  };

  const onChangeAddShopping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewShopping((prevState) => ({
      ...prevState,
      [name]: maskMorney(value, name),
    }));
  };

  const onChangeSelectOnly = (
    event: React.ChangeEvent<HTMLInputElement>,
    shopping: ShoppingType
  ) => {
    const { checked } = event.target;

    setShoppings(
      shoppings.map((shoppingMap) => {
        if (shoppingMap.reference === shopping.reference) {
          return {
            ...shoppingMap,
            select: checked,
          };
        } else {
          return shoppingMap;
        }
      })
    );
  };

  const onChangeSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (checked) {
      setShoppings(
        shoppings.map((shopping) => {
          return {
            ...shopping,
            select: true,
          };
        })
      );
    } else {
      setShoppings(
        shoppings.map((shopping) => {
          return {
            ...shopping,
            select: false,
          };
        })
      );
    }
  };

  const getNextMonth = async () => {
    const { id: monthIdNextMonth, institutions: institutionsNextMonth } =
      await getMonthNumber(month.mesNumber + 1).catch(() => {
        customToast("error", "Algo de errado aconteceu ao buscar próximo mês!");
      });

    return {
      monthIdNextMonth,
      institutionsNextMonth,
    };
  };

  const repeatShopping = async () => {
    setIsRequest(true);
    const { monthIdNextMonth, institutionsNextMonth } = await getNextMonth();

    const nextInstitution = institutionsNextMonth.filter(
      (institutionMap: InstitutionType) =>
        institutionMap.name === institution.name
    );

    const isExistInstitutionNextMonth = nextInstitution.length > 0;

    const shoppingsRepeat = shoppings
      .filter((shopping) => shopping.select)
      .map((shopping) => {
        return {
          ...shopping,
          reference: uuidv4(),
          status_paid: "aberto",
          select: false,
        };
      });

    const institutionRepeat = {
      ...institution,
      reference: uuidv4(),
      shoppings: shoppingsRepeat,
    };

    if (isExistInstitutionNextMonth) {
      const institutionReference = nextInstitution[0].reference;

      updateInstitutionShoppings(institutionReference, shoppingsRepeat)
        .then(() => {
          getMonths();
          customToast("success", "Item(s) foram repetidos para o próximo mês!");
        })

        .catch(() => {
          customToast("error", "Tente novamente!");
        })

        .finally(() => {
          setIsRequest(false);
        });
    } else {
      if (monthIdNextMonth) {
        createInstitutionShoppings(institutionRepeat)
          .then(({ reference: institutionReference }) => {
            updateMonthInstitution(monthIdNextMonth, institutionReference)
              .then(() => {
                getMonths();
                customToast(
                  "success",
                  "Item(s) foram repetidos para o próximo mês!"
                );
              })

              .catch(() => {
                customToast(
                  "error",
                  "Algo de errado aconteceu ao atualizar o proximo mês com a novo cartão"
                );
              });
          })

          .catch(() => {
            customToast(
              "error",
              "Algo de errado aconteceu ao criar nova cartão com itens"
            );
          })

          .finally(() => {
            setIsRequest(false);
          });
      } else {
        customToast("info", "Mês não encontrado!");
      }
    }
  };

  const removeShopping = async () => {
    setRequest(true);

    shoppings.map((shoppingMap) => {
      if (shoppingMap.select) {
        const shoppingReference = shoppingMap.reference;

        deleteShopping(shoppingReference)
          .then(() => {
            getMonths();
            setValueFilter("todos");
            customToast("success", "Deletado com sucesso!");
          })
          .catch(() => {
            customToast("error", "Tente novamente!");
          });
      }
    });

    setRequest(false);
  };

  const updateShopping = async (shoppingUpdate: ShoppingType) => {
    setRequest(true);

    upShopping(shoppingUpdate)
      .then(() => {
        getMonths();
        customToast("success", "Alterado com sucesso!");
      })

      .catch(() => {
        customToast("error", "Tente novamente!");
      })

      .finally(() => {
        setRequest(false);
      });
  };

  const updateAllShopping = async () => {
    setIsRequest(true);

    shoppings.map(async (shoppingMap) => {
      if (shoppingMap.select) {
        const newShoppingUpdate = {
          ...shoppingMap,
          responsible:
            newShopping.responsible === ""
              ? shoppingMap.responsible
              : newShopping.responsible,
          status_paid:
            newShopping.status_paid === ""
              ? shoppingMap.status_paid
              : newShopping.status_paid,
          select: false,
        };

        await upShopping(newShoppingUpdate);
      }
    });

    const newShoppings = shoppings.map((shoppingMap) => {
      const newShoppingUpdate = {
        ...shoppingMap,
        responsible:
          newShopping.responsible === ""
            ? shoppingMap.responsible
            : newShopping.responsible,
        status_paid:
          newShopping.status_paid === ""
            ? shoppingMap.status_paid
            : newShopping.status_paid,
        select: false,
      };

      if (shoppingMap.select) {
        return newShoppingUpdate;
      } else {
        return shoppingMap;
      }
    });

    setShoppings(newShoppings);
    setIsRequest(false);
    setIsVisible(false);
    setNewShopping(initialNewShopping);
  };

  const filter = () => {
    setShoppings(
      institution.shoppings.filter((shopping) => {
        if (shopping.responsible === valueFilter) {
          return shopping;
        } else if (valueFilter === "todos") {
          return shopping;
        }
      })
    );
  };

  React.useMemo(() => {
    filter();
    setIsRequest(false);
  }, [valueFilter]);

  React.useMemo(() => {
    const resultFilter = shoppings.filter((shopping) => shopping.select);
    setIsItensSelect(resultFilter.length > 0);
  }, [shoppings]);

  React.useMemo(() => {
    setShoppings(institution.shoppings);
  }, [institution.shoppings]);

  return (
    <>
      <HeaderTable
        setValueFilter={setValueFilter}
        options={institution.listResponsibleValues}
        onChange={onChangeSelectAll}
        isItensSelect={isItensSelect}
        handlerRepeat={repeatShopping}
        isRequest={isRequest}
        removeShoppings={removeShopping}
        setIsVisible={setIsVisible}
        valueFilter={valueFilter}
      />

      <Modal
        title="Editando item(s)"
        isVisible={isVisible}
        handlerIsVisible={setIsVisible}
        footer={
          <Button
            disabled={request}
            color="#fff"
            background="#B0C4DE"
            icon={<Save width={15} height={15} />}
            onClick={updateAllShopping}
          >
            Salvar
          </Button>
        }
      >
        <Input
          autoFocus
          disabled={request}
          name="responsible"
          placeholder="Nome do responsavel"
          id="responsible"
          value={newShopping.responsible}
          onChange={onChangeAddShopping}
        />

        <SelectStatus
          selectClassName={newShopping.status_paid}
          optionClassName={newShopping.status_paid}
          name="status_paid"
          id="status_paid"
          value={newShopping.status_paid}
          options={[{ name: "aberto" }, { name: "pago" }]}
          onChange={onChangeAddShopping}
        />
      </Modal>

      <Scontent>
        {shoppings.length > 0 ? (
          shoppings.map((shopping, index) => (
            <span key={index}>
              <strong>
                <InputTable
                  type="checkbox"
                  disabled={request}
                  name="select"
                  id={shopping.reference}
                  checked={shopping.select}
                  onChange={(event) => {
                    onChangeSelectOnly(event, shopping);
                  }}
                />
                <InputTable
                  disabled={request}
                  name="description"
                  id={shopping.reference}
                  value={shopping.description}
                  onKeyUp={() => {
                    updateShopping(shopping);
                  }}
                  onChange={onChangeUpdateShopping}
                />
              </strong>
              <strong>
                <InputTable
                  disabled={request}
                  name="amount"
                  id={shopping.reference}
                  value={shopping.amount}
                  onKeyUp={() => {
                    updateShopping(shopping);
                  }}
                  onChange={onChangeUpdateShopping}
                />
              </strong>
              <strong>
                <InputTable
                  disabled={request || valueFilter != "todos"}
                  name="responsible"
                  id={shopping.reference}
                  value={shopping.responsible}
                  onKeyUp={() => {
                    updateShopping(shopping);
                  }}
                  onChange={onChangeUpdateShopping}
                />
              </strong>
              <strong>
                <SelectStatus
                  selectClassName={shopping.status_paid}
                  optionClassName={shopping.status_paid}
                  name="status_paid"
                  id={shopping.reference}
                  value={shopping.status_paid}
                  options={[{ name: "aberto" }, { name: "pago" }]}
                  onChange={onChangeUpdateShopping}
                />

                {shopping.isUpdate && (
                  <Save
                    width={20}
                    height={20}
                    disabled={request}
                    onClick={() => {
                      updateShopping(shopping);
                    }}
                  />
                )}
              </strong>
            </span>
          ))
        ) : (
          <NoResult>
            <span>Nenhum resultado encontrado!</span>
          </NoResult>
        )}
      </Scontent>
    </>
  );
};
