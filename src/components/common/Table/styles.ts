import styled from "styled-components";

export const Scontent = styled.div`
  height: calc(100vh - 22rem);

  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  padding: 1rem;
  overflow-y: scroll;

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.5rem 0;
  }
`;
