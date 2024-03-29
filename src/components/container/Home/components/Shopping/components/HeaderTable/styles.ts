import styled from "styled-components";

export const Scontent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  background: ${(props) => props.theme.backgroundTableHeade};
  padding: 1rem 1.2rem;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const GroupLeft = styled.div`
  display: flex;
  gap: 1rem;
`;
