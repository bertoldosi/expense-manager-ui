import React from "react";
import { Scontent, Sitem } from "./styles";

const list = [
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

function Header() {
  return (
    <Scontent>
      <div>
        <Sitem className="selected">
          <h1>JAN</h1>
        </Sitem>
        {list.map((item) => (
          <Sitem>
            <h1>{item}</h1>
          </Sitem>
        ))}
      </div>
    </Scontent>
  );
}

export default Header;
