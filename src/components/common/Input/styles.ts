import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  border: 1px solid;
  border-radius: 0.3rem;
  padding: 0 1.5rem;

  > input {
    width: 100%;
    border: none;
    background-color: transparent;
    color: ${(props) => props.theme.color};
  }
`;
