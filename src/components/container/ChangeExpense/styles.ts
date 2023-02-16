import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  > span {
    font-size: 2rem;
  }
`;

export const Sbuttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;

  a {
    font-size: 1.5rem;
    color: #1d80f0;
  }
`;
