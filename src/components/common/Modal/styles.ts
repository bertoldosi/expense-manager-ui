import styled from "styled-components";

export const Swrapper = styled.div`
  width: 100%;
  height: calc(100vh - 7rem);
  left: 0;
  top: 7rem;
  position: absolute;
  background: rgba(0, 0, 0, 0.9);

  padding: 3rem 1rem;

  display: flex;
  justify-content: center;
`;

export const Scontent = styled.div`
  width: 100%;
  max-width: 50rem;
  height: min-content;
  border-radius: 0.3rem;
  overflow: hidden;
`;

export const Sheader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  background-color: #48d1cc;
`;

export const Ssection = styled.section`
  padding: 1rem;
`;

export const Sfooter = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
`;
