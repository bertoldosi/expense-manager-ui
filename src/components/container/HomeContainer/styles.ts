import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;

  margin-top: 5rem;
  padding: 1rem;
`;

export const Stable = styled.table`
  width: 100%;
  border-collapse: collapse;

  .no-border {
    border: none;
  }

  thead {
    tr {
      th {
        text-align: start;
        padding: 1rem;
      }
    }
  }

  tbody {
    tr {
      border: 1px solid #fff;

      td {
        padding: 1rem;
      }
    }
  }
`;
