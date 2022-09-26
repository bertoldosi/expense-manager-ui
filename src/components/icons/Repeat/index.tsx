import { MouseEventHandler } from "react";
import styled from "styled-components";

type PropsType = {
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Repeat = ({
  width = "40",
  height = "40",
  onClick,
  disabled,
}: PropsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="blue"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <polyline
        points="200 88 224 64 200 40"
        fill="none"
        stroke="blue"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></polyline>
      <path
        d="M32,128A64.1,64.1,0,0,1,96,64H224"
        fill="none"
        stroke="blue"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <polyline
        points="56 168 32 192 56 216"
        fill="none"
        stroke="blue"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></polyline>
      <path
        d="M224,128a64.1,64.1,0,0,1-64,64H32"
        fill="none"
        stroke="blue"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
    </svg>
  );
};
