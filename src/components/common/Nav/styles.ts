import styled, { css } from "styled-components";

export const Scontent = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;

  background-color: #b0c4de;
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
  transition: background 0.5s;

  &.selected {
    background-color: #f8f8ff;
    border-bottom: 4px solid #48d1cc;
  }

  &:hover {
    background-color: #f8f8ff;
    border-bottom: 4px solid #48d1cc;
  }
`;
