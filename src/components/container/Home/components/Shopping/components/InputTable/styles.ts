import styled from "styled-components";

export const ScontainerInput = styled.div`
  input {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    outline: none;
    font-size: 1.2rem;
    color: ${(props) => props.theme.color};
  }
`;

export const ScontainerInputCheckbox = styled.div`
  input {
    width: 3rem;
    cursor: pointer;
  }
`;
