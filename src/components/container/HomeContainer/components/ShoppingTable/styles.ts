import styled from "styled-components";

export const SsubTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  thead {
    tr {
      th {
        text-align: start;
        padding: 1rem;
        border: 1px solid #333;
      }
    }
  }

  tbody {
    tr {
      td {
        border: 1px solid #333;
        padding: 1rem;
      }
    }
  }
`;

export const ScontentButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 2rem 0;
`;
