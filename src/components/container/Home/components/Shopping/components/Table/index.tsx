import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Save } from "@icons/Save";
import { HeaderTable } from "../../components/HeaderTable";
import { maskMorney } from "@helpers/masks";
import { SelectStatus } from "@commons/SelectStatus";
import InputTable from "@containers/Home/components/Shopping/components/InputTable";

import { NoResult, Scontent, ScontentModal } from "./styles";
import { Modal } from "@commons/Modal";
import { Button } from "@commons/Button";
import Input from "@commons/Input";
import { customToast } from "@commons/CustomToast";
import { UserContext, UserContextType } from "src/context/userContext";
import { InstitutionType, MonthType, ShoppingType } from "@interfaces/*";
import { instance } from "@services/instance";

type PropsType = {
  institution: InstitutionType;
  month: MonthType;
};

const initialNewAllShopping = {
  responsible: "",
  paymentStatus: "aberto",
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

  const onChangeSelectOnly = (event: any, shopping: ShoppingType) => {
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
    const { data }: any = await instance
      .get("/api/month", {
        params: {
          monthNumber: month.monthNumber + 1,
        },
      })
      .catch(() => {
        customToast("error", "Algo de errado aconteceu ao buscar próximo mês!");
      });

    return {
      monthIdNextMonth: data.id,
      institutionsNextMonth: data.institutions,
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
          paymentStatus: "aberto",
          select: false,
        };
      });

    const institutionRepeat = {
      ...institution,
      reference: uuidv4(),
      shoppings: shoppingsRepeat,
    };

    if (isExistInstitutionNextMonth) {
      const institutionId = nextInstitution[0].id;

      await instance
        .post("/api/shopping", {
          shoppings: shoppingsRepeat,
          institutionId,
        })
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
        await instance
          .post("/api/institution", {
            reference: institutionRepeat.reference,
            name: institutionRepeat.name,
            amount: institutionRepeat.amount,
            expirationDate: institutionRepeat.expirationDate,
            monthId: monthIdNextMonth,
          })
          .then(async ({ data: institutionData }) => {
            await instance
              .post("/api/shopping", {
                shoppings: shoppingsRepeat,
                institutionId: institutionData.id,
              })
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
    setIsRequest(true);

    const shoppingSelecteds = shoppings.filter(
      (shoppingFilter) => shoppingFilter.select
    );

    let position = 0;
    while (shoppingSelecteds[position]) {
      const shoppingReference = shoppingSelecteds[position].reference;
      await instance
        .delete("/api/shopping", {
          params: {
            reference: shoppingReference,
          },
        })
        .then(() => {
          customToast("success", "Deletado com sucesso!");
        })
        .catch(() => {
          customToast("error", "Tente novamente!");
        });

      position++;
    }

    getMonths();
    setValueFilter("todos");
    setIsRequest(false);
  };

  const updateShopping = async (shoppingUpdate: ShoppingType) => {
    setIsRequest(true);

    await instance
      .put("/api/shopping", {
        ...shoppingUpdate,
      })
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

  const updateAllShopping = async () => {
    setIsRequest(true);

    const shoppingSelecteds = shoppings.filter(
      (shoppingFilter) => shoppingFilter.select
    );

    const newShoppings = shoppingSelecteds.map((shoppingMap) => {
      const newShoppingUpdate = {
        ...shoppingMap,
        responsible:
          newAllShopping.responsible === ""
            ? shoppingMap.responsible
            : newAllShopping.responsible,
        paymentStatus:
          newAllShopping.paymentStatus === ""
            ? shoppingMap.paymentStatus
            : newAllShopping.paymentStatus,
        select: false,
      };

      return newShoppingUpdate;
    });

    let position = 0;
    while (newShoppings[position]) {
      await instance
        .put("/api/shopping", newShoppings[position])
        .then(() => {
          customToast("success", "Alterado com sucesso!");
        })
        .catch(() => {
          customToast("error", "Tente novamente!");
        });

      position++;
    }

    getMonths();
    setValueFilter("todos");
    setIsRequest(false);
    setIsVisible(false);
    setNewAllShopping(initialNewAllShopping);
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
                  className={shopping.paymentStatus}
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
                  className={shopping.paymentStatus}
                  disabled={isRequest}
                  name="description"
                  id={shopping.reference}
                  value={shopping.description}
                  handleEnter={() => {
                    updateShopping(shopping);
                  }}
                  onChange={onChangeUpdateShopping}
                />
              </strong>
              <strong>
                <InputTable
                  className={shopping.paymentStatus}
                  disabled={isRequest}
                  name="amount"
                  id={shopping.reference}
                  value={shopping.amount}
                  handleEnter={() => {
                    updateShopping(shopping);
                  }}
                  onChange={onChangeUpdateShopping}
                />
              </strong>
              <strong>
                <InputTable
                  className={shopping.paymentStatus}
                  disabled={isRequest || valueFilter != "todos"}
                  name="responsible"
                  id={shopping.reference}
                  value={shopping.responsible}
                  handleEnter={() => {
                    updateShopping(shopping);
                  }}
                  onChange={onChangeUpdateShopping}
                />
              </strong>
              <strong>
                <SelectStatus
                  selectClassName={shopping.paymentStatus}
                  optionClassName={shopping.paymentStatus}
                  name="paymentStatus"
                  id={shopping.reference}
                  value={shopping.paymentStatus}
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
            selectClassName={newAllShopping.paymentStatus}
            optionClassName={newAllShopping.paymentStatus}
            name="paymentStatus"
            id="paymentStatus"
            value={newAllShopping.paymentStatus}
            options={[{ name: "aberto" }, { name: "pago" }]}
            onChange={onChangeUpdateAllShopping}
          />
        </ScontentModal>
      </Modal>
    </>
  );
};
