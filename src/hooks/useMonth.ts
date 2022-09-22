import React from "react";

const useMonth = () => {
  const [nowMonth, setNowMonth] = React.useState<number>(
    () => new Date().getMonth() + 1
  );

  return { nowMonth, setNowMonth };
};

export default useMonth;
