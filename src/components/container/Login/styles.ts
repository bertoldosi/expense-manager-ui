import styled from "styled-components";

export const Scontainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Scontent = styled.div`
  width: 100%;
  max-width: 40rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.backgroundPrimary};
  padding: 1rem 2rem;
`;

export const Sheader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

export const Sbody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Sfooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0 5rem 0;
`;

export const Slink = styled.span`
  font-size: 1.5rem;
  margin-top: -1.5rem;

  a {
    color: aliceblue;
  }
`;
