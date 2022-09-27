import styled from "styled-components";

export const Scontent = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
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
    padding: 0.5rem 0;
    font-size: 1.2rem;
  }

  span:last-child {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`;

export const Sfooter = styled.footer`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem;
`;
