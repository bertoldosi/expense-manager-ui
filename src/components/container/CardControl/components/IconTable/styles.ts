import styled from "styled-components";

export const Scontent = styled.span`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
    padding: 1rem;
    transition: background 0.5s;

    &:hover {
      background-color: #fff;
    }
  }

  .BsChevronUp {
    background-color: #fff;
  }
`;
