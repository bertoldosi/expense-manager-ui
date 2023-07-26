import styled from "styled-components";

export const Sselect = styled.select`
  width: 100%;
  min-width: 8rem;
  background-color: transparent;
  color: ${(props) => props.theme.color};
  border: none;

  cursor: pointer;

  option {
    background-color: ${(props) => props.theme.backgroundPrimary};
    padding: 20rem;
    font-weight: 700;
  }
`;
