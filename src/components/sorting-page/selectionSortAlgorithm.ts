import { Dispatch, SetStateAction } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TRandomArr } from "../../types/main";
import { delay, swapArr } from "../../utils/utils";

export const selectionSortAlgorithm = async (
  arr: Array<TRandomArr>,
  setArr: Dispatch<SetStateAction<Array<TRandomArr>>>,
  direction: Direction
) => {
  for (let i = 0; i < arr.length; i++) {
    let maxIndex = i;
    arr[maxIndex].state = ElementStates.Changing;
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    for (let j = i + 1; j < arr.length; j++) {
      arr[j].state = ElementStates.Changing;
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (direction === Direction.Ascending ? arr[j].number < arr[maxIndex].number : arr[j].number > arr[maxIndex].number) {          
        arr[maxIndex].state = ElementStates.Default
        maxIndex = j;
        arr[j].state = ElementStates.Changing;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    if (maxIndex !== i) {
      swapArr(arr, i, maxIndex);
      arr[i].state = ElementStates.Default;
    }
    arr[maxIndex].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  }
}