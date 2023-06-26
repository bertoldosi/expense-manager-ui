import styled from "styled-components";

export const Scontent = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;

  background-color: ${(props) => props.theme.backgroundNav};

  > h2 {
    width: 100%;
    text-align: center;
  }
`;

export const Slist = styled.div`
  width: 100%;
  height: 100%;
  max-width: max-content;
  display: flex;
  margin: 0 auto;
  overflow: auto;
`;

export const Sitem = styled.div`
  min-width: 8rem;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.selected {
    background-color: ${(props) => props.theme.backgroundNavEmphasis};
    border-bottom: 4px solid
      ${(props) => props.theme.backgroundLineFooterEmphasis};
  }

  &:hover {
    background-color: ${(props) => props.theme.backgroundNavEmphasis};
    border-bottom: 4px solid
      ${(props) => props.theme.backgroundLineFooterEmphasis};
  }
`;
