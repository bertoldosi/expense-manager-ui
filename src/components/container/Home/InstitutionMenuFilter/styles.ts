import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  align-items: center;

  padding: 1rem 0;
  gap: 0.5rem;
  font-size: 1.5rem;
`;

export const Sdate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
`;
