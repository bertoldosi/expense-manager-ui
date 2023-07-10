import React from "react";

import { Scontainer, Sdate } from "./styles";
import { ChevronDoubleLeft } from "@icons/ChevronDoubleLeft";
import { ChevronDoubleRight } from "@icons/ChevronDoubleRight";
import { BsChevronDown } from "@icons/BsChevronDown";

type PropsType = {};

function InstitutionMenuFilter({}: PropsType) {
  return (
    <Scontainer>
      <ChevronDoubleLeft width="3rem" height="3rem" />

      <Sdate>
        <div>
          <strong>SET</strong>
          <span>de</span>
          <strong>2022</strong>
        </div>

        <BsChevronDown width="2rem" height="2rem" />
      </Sdate>

      <ChevronDoubleRight width="3rem" height="3rem" />
    </Scontainer>
  );
}

export default InstitutionMenuFilter;
