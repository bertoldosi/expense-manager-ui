import styled, { css } from "styled-components";

type LinkPropsType = {
  isSeleted: boolean;
};

export const Scontent = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
`;

export const Slink = styled.a<LinkPropsType>`
  padding: 0.5rem 1rem;
  cursor: pointer;

  ${(props) =>
    props.isSeleted &&
    css`
      & {
        border-bottom: solid 1px #fff;
      }
    `}
`;

export const ScontentButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  margin-bottom: 4rem;
`;
