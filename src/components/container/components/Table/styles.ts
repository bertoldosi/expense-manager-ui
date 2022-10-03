import styled from "styled-components";

export const Scontent = styled.div`
  height: calc(100vh - 27rem);

  display: flex;
  flex-direction: column;
  overflow-y: auto;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 0.5rem;

    > strong {
      width: max-content;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &:hover {
      background-color: #3333;
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
  background-color: #fff;
  border-radius: 0.3rem;
  span {
    font-size: 2rem;
  }
`;
