import styled from "styled-components";

export const Stotal = styled.table`
  width: 100%;
  max-width: 40rem;
  border-collapse: collapse;
  margin: 3rem 1rem 3rem 1rem;

  thead {
    tr {
      th {
        padding: 1rem;
        border-bottom: 1px solid #333;
        text-align: start;
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 0.6rem !important;
      }
    }
  }
`;
