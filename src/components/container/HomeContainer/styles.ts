import styled from "styled-components";

export const Scontainer = styled.div`
  margin-top: 5rem;
`;

export const Stable = styled.table`
  width: 100%;
  border-collapse: collapse;

  .no-border {
    border: none;
    padding: 0;

    td {
      padding: 0;
    }
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
