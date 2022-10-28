import styled, { css } from "styled-components";

export const Scontent = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;

  background-color: ${(props) => props.theme.backgroundHeade};

  > div {
    width: 100%;
    height: 100%;
    max-width: max-content;
    display: flex;
    margin: 0 auto;
    overflow: auto;
  }
`;
export const Sitem = styled.div`
  min-width: 8rem;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.5s;

  &.selected {
    background-color: ${(props) => props.theme.backgroundHeadeEmphasis};
    border-bottom: 4px solid
      ${(props) => props.theme.backgroundHeadeLineFooterEmphasis};
  }

  &:hover {
    background-color: ${(props) => props.theme.backgroundHeadeEmphasis};
    border-bottom: 4px solid
      ${(props) => props.theme.backgroundHeadeLineFooterEmphasis};
  }
`;
