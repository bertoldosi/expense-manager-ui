import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  min-width: 20rem;
  background-color: ${(props) => props.theme.backgroundPrimary}; ;
`;

export const ScontentFooter = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${(props) => props.theme.color};
  font-size: 1.2rem;
`;

export const Sitem = styled.div`
  padding: 1rem;
  transition: background 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.backgroundBory};
    font-weight: 600;
  }

  &.no-emphasis {
    background-color: initial;
    font-weight: initial;
    cursor: default;
  }

  a {
    width: 100%;
    display: block;
    text-decoration: none;
    color: ${(props) => props.theme.color};
    font-size: 1.2rem;
  }

  span {
    color: ${(props) => props.theme.color};
    font-size: 1.5rem;
  }
`;
