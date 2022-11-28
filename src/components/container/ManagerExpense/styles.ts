import styled from "styled-components";

export const Slist = styled.div`
  font-size: 1.2rem;

  h3 {
    margin-bottom: 0.5rem;
  }

  > div {
    width: 100%;
    max-width: 40rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.5s;
    padding: 0 0.5rem;
    border-radius: 0.2rem;

    &:hover {
      color: #333;
      background-color: #fff;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

export const Sexpenses = styled.div``;
