import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;

  > button {
    background-color: ${(props) => props.theme.backgroundSecondaryContrast};
    color: ${(props) => props.theme.textSecondaryContrast};
    padding: 1rem;
  }
`;
