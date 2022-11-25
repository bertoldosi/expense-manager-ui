import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Sbuttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;

  a {
    font-size: 1.5rem;
    color: #1d80f0;
  }
`;

export const Sresume = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;
`;
export const Sname = styled.div`
  display: flex;
  align-items: center;

  span {
    padding: 0 0.5rem;
  }

  margin-bottom: 2rem;
`;
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
