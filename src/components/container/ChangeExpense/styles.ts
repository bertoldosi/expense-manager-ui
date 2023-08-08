import styled from "styled-components";

export const Scontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  strong {
    font-size: 1.5rem;
  }

  > span {
    width: 100%;
    max-width: 50%;
    font-size: 1.5rem;
    padding: 0.8rem 0.5rem;

    &:hover {
      border-radius: 0.3rem;
      background-color: ${(props) => props.theme.backgroundSecondary};
      color: ${(props) => props.theme.textSecondary};
      font-weight: bold;
      cursor: pointer;
    }
  }
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
