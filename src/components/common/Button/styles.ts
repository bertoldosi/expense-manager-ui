import styled from "styled-components";

type PropsType = {
  color?: string;
  background?: string;
};

export const Scontent = styled.label<PropsType>`
  width: 100%;
  max-width: 12rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.background};
  border-radius: 0.3rem;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;

  button {
    width: 100%;
    height: 100%;
    background: transparent;

    color: ${(props) => props.color};
    border: none;

    font-size: 1.5rem;
    font-weight: 600;
  }
`;
