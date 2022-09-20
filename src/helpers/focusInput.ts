export const focusInput = () => {
  const inputsTable = window.document.getElementsByName("description");
  const lastInput = inputsTable[inputsTable.length - 1];
  lastInput?.focus();
};
