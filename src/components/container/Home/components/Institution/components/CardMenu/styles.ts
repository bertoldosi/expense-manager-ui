import styled from "styled-components";

type HeaderType = {
  background?: string;
};

export const Scontent = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const Sheader = styled.header<HeaderType>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  background-color: #1b66ff;

  h1 {
    font-size: 1.2rem;
  }
`;

export const Ssection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin-bottom: 2rem;
  background-color: ${(props) => props.theme.backgroundPrimary};

  span {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    font-size: 1.2rem;

    > strong {
      font-weight: 600;
    }
  }

  span:last-child {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`;

export const Sfooter = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  gap: 1rem;
`;
