import React from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import { updateMonthInstitution } from "@graphqls/month";
import { createInstitution, deleteInstitution } from "@graphqls/institution";

import {
  InstitutionType,
  MonthType,
  ResponsibleValuesType,
} from "../../Home/types";

import Nav from "@containers/components/Nav";
import Input from "@commons/Input";
import { Trash } from "@icons/Trash";
import { Add } from "@icons/Add";
import { Modal } from "@commons/Modal";
import { Save } from "@icons/Save";
import { Button } from "@commons/Button";
import { CardMenu } from "@containers/components/CardMenu";
import { Expenses } from "@containers/components/Expenses";
import { Saside, ScontainerModal, Ssection, Swrapper } from "./styles";
import { customToast } from "@helpers/customToast";
import validationSchema from "./validations";
import { Error } from "@commons/Error";

type PropsType = {
  monthList: MonthType[];
  month: MonthType;
  setMonthList: Function;
  responsibleTotalAmountList: ResponsibleValuesType[];
  getMonths: Function;
};

const initialValues = {
  reference: uuidv4(),
  name: "",
  amount: "0,00",
  listResponsibleValues: [],
  expirationDate: "",
  shoppings: [],
};

export const Content = ({
  monthList,
  setMonthList,
  month,
  responsibleTotalAmountList,
  getMonths,
}: PropsType) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [isRequest, setIsRequest] = React.useState<boolean>(false);
  const [institutionVisible, setInstitutionVisible] = React.useState<number>(0);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        reference: uuidv4(),
      };

      const { reference, name } = await createInstitution(payload);

      await updateMonthInstitution(month.id, reference)
        .then(() => {
          getMonths();
          customToast("success", `${name} incluído com sucesso!`);
        })
        .catch(() => {
          customToast("error", "Tente novamente!");
        })
        .finally(() => {
          setIsVisible(false);
          setIsRequest(false);
          formik.resetForm();
        });
    },

    validationSchema,
  });

  const removeInstitution = (institution: InstitutionType) => {
    toast.info(<h3>Processando...</h3>, {
      isLoading: true,
      toastId: "process",
    });

    const isShoppings = institution.shoppings.length > 0;

    if (isShoppings) {
      toast.update("process", {
        type: "error",
        isLoading: false,
        render: <h3>Remova o(s) item(s) antes de excluir o cartão!</h3>,
        autoClose: 1000,
      });

      return;
    }

    deleteInstitution(institution.reference)
      .then(() => {
        getMonths();

        toast.update("process", {
          type: "success",
          isLoading: false,
          render: <h3>{`${institution.name} removido com sucesso!`}</h3>,
          autoClose: 2000,
        });
      })

      .catch(() => {
        toast.update("process", {
          type: "error",
          isLoading: false,
          render: <h3>Tente novamente!</h3>,
          autoClose: 2000,
        });
      });
  };

  return (
    <>
      {month.institutions.length === 0 ? (
        <Swrapper>
          <nav>
            <Nav
              institutions={month.institutions}
              setInstitutionVisible={setInstitutionVisible}
              institutionVisible={institutionVisible}
            />
          </nav>

          <Ssection>
            <Saside>
              <CardMenu
                title="TOTAL GERAL"
                list={responsibleTotalAmountList}
                background="#de4f15"
                isFooter={
                  <>
                    <Button
                      color="#fff"
                      background="#B0C4DE"
                      icon={<Add width={15} height={15} />}
                      onClick={() => {
                        setIsVisible(!isVisible);
                      }}
                    >
                      Novo cartão
                    </Button>
                  </>
                }
              />
            </Saside>
          </Ssection>
        </Swrapper>
      ) : (
        <Swrapper>
          <nav>
            <Nav
              institutions={month.institutions}
              setInstitutionVisible={setInstitutionVisible}
              institutionVisible={institutionVisible}
            />
          </nav>

          {month.institutions.map((institutionMap, index) => {
            return (
              <div key={index}>
                {index === institutionVisible && (
                  <Ssection>
                    <Saside>
                      <CardMenu
                        title={`TOTAL ${institutionMap.name.toUpperCase()}`}
                        list={institutionMap.listResponsibleValues}
                        background="#029b99"
                      />
                      <CardMenu
                        title="TOTAL GERAL"
                        list={responsibleTotalAmountList}
                        background="#de4f15"
                        isFooter={
                          <>
                            <Button
                              color="#fff"
                              background="#B0C4DE"
                              icon={<Add width={15} height={15} />}
                              onClick={() => {
                                setIsVisible(!isVisible);
                              }}
                            >
                              Novo cartão
                            </Button>
                            <Button
                              color="#fff"
                              background="#B0C4DE"
                              icon={<Trash width={15} height={15} />}
                              onClick={() => {
                                removeInstitution(institutionMap);
                              }}
                            >
                              Excluir {institutionMap.name}
                            </Button>
                          </>
                        }
                      />
                    </Saside>
                    <Expenses
                      institution={institutionMap}
                      monthList={monthList}
                      setMonthList={setMonthList}
                      month={month}
                      getMonths={getMonths}
                    />
                  </Ssection>
                )}
              </div>
            );
          })}
        </Swrapper>
      )}

      <Modal
        title="Novo cartão"
        isVisible={isVisible}
        handlerIsVisible={setIsVisible}
      >
        <ScontainerModal onSubmit={formik.handleSubmit}>
          <Input
            autofocus
            name="name"
            placeholder="Nome da instituição"
            id={formik.values.reference}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && <Error>{formik.errors.name}</Error>}
          />

          <Input
            name="expirationDate"
            id={formik.values.reference}
            value={formik.values.expirationDate}
            onChange={formik.handleChange}
            type="date"
            error={
              formik.touched.expirationDate && (
                <Error>{formik.errors.expirationDate}</Error>
              )
            }
          />

          <Button
            ContainerInputClassName="container-button"
            disabled={isRequest}
            color="#fff"
            background="#B0C4DE"
            icon={<Save width={15} height={15} />}
            type="submit"
          >
            Salvar
          </Button>
        </ScontainerModal>
      </Modal>
    </>
  );
};
