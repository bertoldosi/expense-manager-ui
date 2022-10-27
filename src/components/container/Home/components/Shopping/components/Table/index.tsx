import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Save } from "@icons/Save";
import { HeaderTable } from "../../components/HeaderTable";
import { maskMorney } from "@helpers/masks";
import { deleteShopping } from "@graphqls/shopping";
import { SelectStatus } from "@commons/SelectStatus";
import InputTable from "@containers/Home/components/Shopping/components/InputTable";
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

import { NoResult, Scontent, ScontentModal } from "./styles";
import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { customToast } from "@helpers/customToast";
import { UserContext, UserContextType } from "src/context/userContext";

type PropsType = {
  institution: InstitutionType;
  month: MonthType;
};

const initialNewAllShopping = {
  responsible: "",
  status_paid: "aberto",
  select: false,
};

export const Table = ({ institution, month }: PropsType) => {
  const { getMonths } = React.useContext(UserContext) as UserContextType;

  const [valueFilter, setValueFilter] = React.useState("todos");
  const [shoppings, setShoppings] = React.useState<ShoppingType[]>([]);
  const [isItensSelect, setIsItensSelect] = React.useState(false);
  const [isRequest, setIsRequest] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [newAllShopping, setNewAllShopping] = React.useState(
    initialNewAllShopping
  );

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

  const onChangeUpdateAllShopping = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setNewAllShopping((prevState) => ({
      ...prevState,
      [name]: value,
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

  const removeShopping = () => {
    setIsRequest(true);

    Promise.all(
      shoppings.map(async (shoppingMap) => {
        if (shoppingMap.select) {
          const shoppingReference = shoppingMap.reference;
          await deleteShopping(shoppingReference);
        }
      })
    ).then(() => {
      getMonths();
      setValueFilter("todos");
      setIsRequest(false);
    });
  };

  const updateShopping = async (shoppingUpdate: ShoppingType) => {
    setIsRequest(true);

    upShopping(shoppingUpdate)
      .then(() => {
        getMonths();
        customToast("success", "Alterado com sucesso!");
      })

      .catch(() => {
        customToast("error", "Tente novamente!");
      })

      .finally(() => {
        setIsRequest(false);
      });
  };

  const updateAllShopping = () => {
    setIsRequest(true);

    Promise.all(
      shoppings.map(async (shoppingMap) => {
        if (shoppingMap.select) {
          const newShoppingUpdate = {
            ...shoppingMap,
            responsible:
              newAllShopping.responsible === ""
                ? shoppingMap.responsible
                : newAllShopping.responsible,
            status_paid:
              newAllShopping.status_paid === ""
                ? shoppingMap.status_paid
                : newAllShopping.status_paid,
            select: false,
          };

          await upShopping(newShoppingUpdate);
        }
      })
    ).then(() => {
      getMonths();
      setValueFilter("todos");
      setIsRequest(false);
      setIsVisible(false);
      setNewAllShopping(initialNewAllShopping);
    });
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

      <Scontent>
        {shoppings.length > 0 ? (
          shoppings.map((shopping, index) => (
            <span key={index}>
              <strong>
                <InputTable
                  type="checkbox"
                  disabled={isRequest}
                  name="select"
                  id={shopping.reference}
                  checked={shopping.select}
                  onChange={(event) => {
                    onChangeSelectOnly(event, shopping);
                  }}
                />
                <InputTable
                  disabled={isRequest}
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
                  disabled={isRequest}
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
                  disabled={isRequest || valueFilter != "todos"}
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
                    disabled={isRequest}
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

      <Modal
        title="Editando item(s)"
        isVisible={isVisible}
        handlerIsVisible={setIsVisible}
        footer={
          <Button
            disabled={isRequest}
            color="#fff"
            background="#B0C4DE"
            icon={<Save width={15} height={15} />}
            onClick={updateAllShopping}
          >
            Salvar
          </Button>
        }
      >
        <ScontentModal>
          <Input
            autoFocus
            disabled={isRequest}
            name="responsible"
            placeholder="Nome do responsavel"
            id="responsible"
            value={newAllShopping.responsible}
            onChange={onChangeUpdateAllShopping}
          />

          <SelectStatus
            selectClassName={newAllShopping.status_paid}
            optionClassName={newAllShopping.status_paid}
            name="status_paid"
            id="status_paid"
            value={newAllShopping.status_paid}
            options={[{ name: "aberto" }, { name: "pago" }]}
            onChange={onChangeUpdateAllShopping}
          />
        </ScontentModal>
      </Modal>
    </>
  );
};
