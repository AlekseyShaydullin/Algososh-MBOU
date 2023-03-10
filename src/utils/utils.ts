import { ElementStates } from "../types/element-states";
import { IListArr, TArrayString, TRandomArr } from "../types/main";

export const delay = (timer: number) => new Promise<void>(
  resolve => setTimeout(resolve, timer)
);

export const swap = (arr: TArrayString[], firstIndex: number, endIndex: number): void => {
  [arr[firstIndex], arr[endIndex]] = [arr[endIndex], arr[firstIndex]]
}

export const swapArr = (arr: TRandomArr[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

export const getRandomInit = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const initialArr = ['0', '34', '8', '1'];

export const listArr: IListArr[] = initialArr.map((el) => ({
    value: el,
    state: ElementStates.Default,
    smallItem: null
}))