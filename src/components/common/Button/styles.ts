import styled from "styled-components";

type PropsType = {
  color?: string;
  background?: string;
  width?: string;
  height?: string;
};

export const Scontent = styled.label<PropsType>`
  width: 100%;
  max-width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.background};
  border-radius: 0.3rem;
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
