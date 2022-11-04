import { ShoppingType } from "@interfaces/*";

export const chunk = (chunkSize: number | string, array: ShoppingType[]) => {
  return array.reduce(function (previous: any, current) {
    var chunk: any;

    if (
      previous.length === 0 ||
      previous[previous.length - 1].length === chunkSize
    ) {
      chunk = [];
      previous.push(chunk);
    } else {
      chunk = previous[previous.length - 1];
    }
    chunk.push(current);
    return previous;
  }, []);
};
