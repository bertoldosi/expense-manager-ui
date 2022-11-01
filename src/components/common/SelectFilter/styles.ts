import styled from "styled-components";

export const Scontent = styled.div`
  select {
    border: none;
    background: transparent;
    padding: 0.2rem;
    color: ${(props) => props.theme.color};
    font-weight: 600;
    cursor: pointer;

    option {
      color: #333;
      font-weight: 600;
    }
  }
`;
