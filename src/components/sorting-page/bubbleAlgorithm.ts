import { Dispatch, SetStateAction } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TRandomArr } from "../../types/main";
import { delay, swap } from "../../utils/utils";

export const bubbleAlgorithm = async (
  arr: Array<TRandomArr>,
  setArr: Dispatch<SetStateAction<Array<TRandomArr>>>,
  direction: Direction
) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const p = j + 1;
      arr[j].state = ElementStates.Changing;
      arr[p].state = ElementStates.Changing;
      setArr([...arr]);
      await delay(SHORT_DELAY_IN_MS);
      if (direction === Direction.Ascending ? arr[j].number > arr[p].number : arr[j].number < arr[p].number) {
        swap(arr, j, p)
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS);
      }
      arr[j].state = ElementStates.Default;
      arr[p].state = ElementStates.Default;
      setArr([...arr]);
    }
    arr[arr.length - i - 1].state = ElementStates.Modified;
    setArr([...arr]);
  }
}