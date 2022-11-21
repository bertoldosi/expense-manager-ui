import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  border: 1px solid;
  border-radius: 0.3rem;
  padding: 1.5rem;

  > input {
    width: 100%;
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.color};
  }
`;
