import { MouseEventHandler } from "react";
import styled from "styled-components";

type PropsType = {
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: string;
};

export const Scontainer = styled.div`
  cursor: pointer;
`;

export const User = ({
  width = "40",
  height = "40",
  color = "#333",
}: PropsType) => {
  return (
    <Scontainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill={color}
        viewBox="0 0 256 256"
      >
        <rect width="256" height="256" fill="none"></rect>
        <circle
          cx="128"
          cy="120"
          r="40"
          fill="none"
          stroke={color}
          strokeMiterlimit="10"
          strokeWidth="16"
        ></circle>
        <path
          d="M63.8,199.4a72,72,0,0,1,128.4,0"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></path>
        <circle
          cx="200"
          cy="56"
          r="16"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></circle>
        <line
          x1="200"
          y1="40"
          x2="200"
          y2="28"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="186.1"
          y1="48"
          x2="175.8"
          y2="42"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="186.1"
          y1="64"
          x2="175.8"
          y2="70"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="200"
          y1="72"
          x2="200"
          y2="84"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="213.9"
          y1="64"
          x2="224.2"
          y2="70"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <line
          x1="213.9"
          y1="48"
          x2="224.2"
          y2="42"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></line>
        <path
          d="M223.3,116.5A87.7,87.7,0,0,1,224,128a96,96,0,1,1-96-96,87,87,0,0,1,8.9.4"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        ></path>
      </svg>
    </Scontainer>
  );
};
