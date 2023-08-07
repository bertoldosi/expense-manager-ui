import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  min-width: 20rem;
  background-color: ${(props) => props.theme.backgroundSecondary};
`;

export const ScontentFooter = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${(props) => props.theme.textSecondary};
  font-size: 1.2rem;
`;

export const Sitem = styled.div`
  transition: background 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.textSecondary};

    font-weight: 600;
    a,
    span {
      color: ${(props) => props.theme.backgroundSecondary};
    }
  }

  &.no-emphasis {
    background-color: initial;
    font-weight: initial;
    cursor: default;
  }

  a {
    width: 100%;
    height: 100%;
    display: block;
    text-decoration: none;
    color: ${(props) => props.theme.textSecondary};
    font-size: 1.2rem;

    padding: 1rem;
  }

  span {
    width: 100%;
    height: 100%;
    display: block;
    color: ${(props) => props.theme.textSecondary};
    font-size: 1.5rem;
    padding: 1rem;
  }
`;
