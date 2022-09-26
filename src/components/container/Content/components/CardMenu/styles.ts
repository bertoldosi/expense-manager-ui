import styled from "styled-components";

export const Scontent = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Sheader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background-color: #48d1cc;

  h1 {
    font-size: 1.3rem;
  }
`;

export const Ssection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin-bottom: 2rem;

  span {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0;
  }
`;
