import React from "react";

type PropsType = {
  width?: string | number;
  height?: string | number;
  fill?: string;
  stroke?: string;
};

export const BsChevronUp: React.FC<PropsType> = ({
  width = "40",
  height = "40",
  fill = "#f5f5ff",
  stroke = "#f5f5ff",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <polyline
        points="48 160 128 80 208 160"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      ></polyline>
    </svg>
  );
};
