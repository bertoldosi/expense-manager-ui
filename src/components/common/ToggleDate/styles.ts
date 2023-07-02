import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Scontent = styled.div`
  width: 19rem;
  background-color: ${(props) => props.theme.backgroundPrimary};
`;
