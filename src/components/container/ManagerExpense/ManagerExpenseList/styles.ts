import styled from "styled-components";

export const Scontainer = styled.ul`
  li {
    width: 100%;
    max-width: 50%;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-radius: 0.2rem;
    margin-top: 0.5rem;
    transition: 0.5s;

    &:hover {
      background-color: #f5f5f5;
      color: #000;
      font-weight: 800;
    }
  }
`;

export const Sicons = styled.div`
  display: flex;
  gap: 1rem;
`;
