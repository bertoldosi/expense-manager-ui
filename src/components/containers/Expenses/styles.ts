import styled from "styled-components";

export const Scontent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
`;

export const Sheader = styled.header`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
