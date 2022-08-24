import styled from "styled-components";

export const Scontainer = styled.div`
  width: 100%;
`;

export const Stable = styled.table`
  border-collapse: collapse;
  width: 100%;

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

// export const Scontent = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
// `;

// export const STable = styled.table`
//   width: 100%;
//   border-collapse: collapse;

//   thead {
//     tr {
//       font-size: 1.6rem;
//       text-align: left;

//       th {
//         padding: 2rem 1rem;

//         &:last-child {
//           text-align: end;
//         }
//       }
//     }
//   }

//   tbody {
//     tr {
//       border: solid 1px #fff;
//       transition: background 0.3s;

//       td {
//         padding: 2rem 1rem;

//         &:last-child {
//           text-align: end;
//         }
//       }
//     }
//   }
// `;

// export const STableCollapsed = styled.table`
//   width: 100%;
//   border-collapse: collapse;

//   thead {
//     tr {
//       font-size: 1.2rem;
//       text-align: left;

//       th {
//         border: solid 1px #fff;
//         padding: 1rem;

//         &:last-child {
//           text-align: center;
//         }
//       }
//     }
//   }

//   tbody {
//     tr {
//       text-align: left;

//       td {
//         padding: 0 1rem;
//         border: solid 1px #fff;

//         &:last-child {
//           text-align: center;
//         }
//       }
//     }
//   }
// `;
