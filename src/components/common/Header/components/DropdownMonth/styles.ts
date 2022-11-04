import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  min-width: 18rem;
`;

export const Sitem = styled.div`
  padding: 1rem;
  transition: background 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.backgroundBory};
    font-weight: 600;
  }

  &.selected {
    background-color: ${(props) => props.theme.backgroundBory};
    font-weight: 600;
    cursor: not-allowed;
  }

  span {
    color: ${(props) => props.theme.color};
    font-size: 1.5rem;
  }
`;
