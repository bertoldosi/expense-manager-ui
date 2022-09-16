import styled from "styled-components";

export const SsubTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  background-color: #3333;
  padding: 1rem !important;
  border-radius: 0.5rem !important;
  overflow: hidden;

  thead {
    tr {
      th {
        text-align: start;
        padding: 1rem;
        border: 1px solid #333;

        &.center {
          text-align: center;
        }
      }
    }
  }

  tbody {
    tr {
      td {
        border: 1px solid #333;
        padding: 1rem;

        &.center {
          text-align: center;
        }

        &.content-btn {
          text-align: center;

          button {
            margin-left: 0.4rem;
            padding: 0.5rem;

            &:focus {
              background-color: transparent;
            }
          }
        }

        &.no-border {
          border: transparent !important;

          td {
            border: none;
          }
        }
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
