import { Dispatch, SetStateAction } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArrayString } from "../../types/main";
import { delay, swap } from "../../utils/utils";

export const reverseAlgorithm = async (
  arr: TArrayString[],
  setReverse: Dispatch<SetStateAction<TArrayString[] | null>>
) => {
  for (let i = 0; i < arr.length; i++) {
    let end = arr.length - 1 - i;
    
    if (arr.length === 1) {
      arr[i].state = ElementStates.Modified;
    }
    
    if (i < end) {
      arr[i].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setReverse([...arr]);
      swap(arr, i, end);
      await delay(DELAY_IN_MS);
    }

    arr[i].state = ElementStates.Modified;
    arr[end].state = ElementStates.Modified;
    setReverse([...arr]);
  }
}