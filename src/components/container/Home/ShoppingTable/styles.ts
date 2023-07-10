import styled from "styled-components";

export const Scontent = styled.div`
  height: calc(100vh - 33.4rem);
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background: ${(props) => props.theme.backgroundBory};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.backgroundPrimary};
  }

  > span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.5rem;
    background-color: ${(props) => props.theme.backgroundPrimary};

    > strong {
      width: max-content;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 1rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.backgroundSecondary};

      strong {
        input {
          color: #000;
        }
      }
    }
  }

  @media (max-width: 700px) {
    height: min-content;
  }
`;

export const NoResult = styled.div`
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundPrimary};
  border-radius: 0.3rem;

  span {
    font-size: 2rem;
  }
`;
