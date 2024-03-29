import styled from "styled-components";

export const Scontainer = styled.main`
  width: 100%;
`;

export const ScontentNull = styled.main`
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
  height: 20rem;
  display: flex;
  background-color: ${(props) => props.theme.backgroundHeade};
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;
