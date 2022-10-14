import styled from "styled-components";

type PropsType = {
  color: string;
  background: string;
};

export const Scontent = styled.div<PropsType>`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;

  button {
    width: min-content;
  }
`;

export const Sbutton = styled.button`
  width: 100%;
  padding: 0.5rem;

  background-color: transparent;
  border: none;

  font-size: 1rem;
  font-weight: 600;

  svg {
    margin-right: 0.5rem;
  }
`;
