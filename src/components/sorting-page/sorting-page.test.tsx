import { arrayOfMultipleElements, arrayOfOneElement, resultArrayAsc, resultArrayDes, resultArrayOfOneElement } from "../../constants/arraysForTests";
import { Direction } from "../../types/direction";
import { bubbleAlgorithm } from "./bubbleAlgorithm";
import { selectionSortAlgorithm } from "./selectionSortAlgorithm";

jest.setTimeout(30000);
const setArr = jest.fn();

describe('selection sort algorithm testing asc', () => {

  it('should be correct with empty array', async () => {
    await selectionSortAlgorithm([], setArr, Direction.Ascending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it('should be correct with only one item', async () => {
    await selectionSortAlgorithm(arrayOfOneElement, setArr, Direction.Ascending);
    expect(setArr).toHaveBeenLastCalledWith(resultArrayOfOneElement);
  });

  it('should be correct with items', async () => {
    await selectionSortAlgorithm(arrayOfMultipleElements, setArr, Direction.Ascending);
    expect(setArr).toHaveBeenLastCalledWith(resultArrayAsc);
  })
});

describe('selection sort algorithm testing des', () => {

  it('should be correct with empty array', async () => {
    await selectionSortAlgorithm([], setArr, Direction.Descending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it('should be correct with only one item', async () => {
    await selectionSortAlgorithm(arrayOfOneElement, setArr, Direction.Descending);
    expect(setArr).toHaveBeenLastCalledWith(resultArrayOfOneElement);
  });

  it('should be correct with items', async () => {
    await selectionSortAlgorithm(arrayOfMultipleElements, setArr, Direction.Descending);
    expect(setArr).toHaveBeenLastCalledWith(resultArrayDes);
  })
});

describe('bubble sort algorithm testing asc', () => {

  it('should be correct with empty array', async () => {
    await bubbleAlgorithm([], setArr, Direction.Ascending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it('should be correct with only one item', async () => {
    await bubbleAlgorithm(arrayOfOneElement, setArr, Direction.Ascending);
    expect(setArr).toHaveBeenLastCalledWith(resultArrayOfOneElement);
  });

  it('should be correct with items', async () => {
    await bubbleAlgorithm(arrayOfMultipleElements, setArr, Direction.Ascending);
    expect(setArr).toHaveBeenLastCalledWith(resultArrayAsc);
  })
});

describe('bubble sort algorithm testing des', () => {

  it('should be correct with empty array', async () => {
    await bubbleAlgorithm([], setArr, Direction.Descending);
    expect(setArr).toHaveBeenCalledTimes(0);
  });

  it('should be correct with only one item', async () => {
    await bubbleAlgorithm(arrayOfOneElement, setArr, Direction.Descending);
    expect(setArr).toHaveBeenLastCalledWith(resultArrayOfOneElement);
  });

  it('should be correct with items', async () => {
    await bubbleAlgorithm(arrayOfMultipleElements, setArr, Direction.Descending);
    expect(setArr).toHaveBeenLastCalledWith(resultArrayDes);
  })
});
