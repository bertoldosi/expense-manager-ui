import styled from "styled-components";

export const Swrapper = styled.div`
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
  padding-top: 2rem;
`;

export const Ssection = styled.section`
  display: flex;
  gap: 1rem;
  padding-top: 1rem;

  @media (max-width: 320px) {
    flex-direction: column-reverse;
  }
`;

export const Saside = styled.aside`
  width: 25rem;
  background-color: #fff;

  @media (max-width: 320px) {
    width: 100%;
  }
`;

export const Sarticle = styled.article`
  flex: 1;
`;
