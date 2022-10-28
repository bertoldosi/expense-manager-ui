import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > input {
    width: 100%;
    height: 3rem;
    border: none;
    background: transparent;
    outline: none;
    color: ${(props) => props.theme.color};
    border-bottom: 1px solid ${(props) => props.theme.color};

    &::placeholder {
      color: ${(props) => props.theme.color};
    }
  }
`;
