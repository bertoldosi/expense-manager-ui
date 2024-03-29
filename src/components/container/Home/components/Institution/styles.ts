import styled from "styled-components";

export const ScontainerModal = styled.form`
  & .container-button {
    margin-top: 2rem;
  }
`;

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
    padding: 1rem;
  }
`;

export const Saside = styled.aside`
  width: 22rem;
  height: calc(100vh - 15.5rem);
  background-color: ${(props) => props.theme.backgroundCard};
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 6px;
    background: ${(props) => props.theme.backgroundBory};
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.backgroundHeade};
  }

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
    margin-top: 2rem;
  }
`;
