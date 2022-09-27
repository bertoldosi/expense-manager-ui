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

  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;

export const Saside = styled.aside`
  width: 25rem;
  height: calc(100vh - 15rem);
  background-color: #fff;

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
`;
