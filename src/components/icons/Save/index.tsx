import { MouseEventHandler } from "react";
import styled from "styled-components";

type PropsType = {
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Scontent = styled.button`
  background-color: transparent;
  border: none;

  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s;

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 360px) {
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export const Save = ({
  width = "40",
  height = "40",
  onClick,
  disabled,
}: PropsType) => {
  return (
    <Scontent onClick={onClick} disabled={disabled}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="#B4E391"
        viewBox="0 0 256 256"
      >
        <rect width="256" height="256" fill="none"></rect>
        <polyline
          points="216 72 104 184 48 128"
          fill="none"
          stroke="#B4E391"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="16"
        ></polyline>
      </svg>
    </Scontent>
  );
};
