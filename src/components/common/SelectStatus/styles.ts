import styled from "styled-components";

export const Scontent = styled.div`
  select {
    border: none;
    background: transparent;
    padding: 0.2rem;
    color: #333;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;

    &.soma {
      color: ${(props) => props.theme.color};
    }

    &.desconta {
      color: orange;
    }

    option {
      color: #333;
      font-weight: 600;
    }
  }
`;
