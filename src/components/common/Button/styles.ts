import styled from "styled-components";

type PropsType = {
  backgroundColor: string;
  color?: string;
};

export const Sbutton = styled.button<PropsType>`
  padding: 1rem 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-weight: 600;

  border-radius: 0.3rem;

  &:disabled {
    opacity: 60%;
    cursor: not-allowed;
  }
`;
