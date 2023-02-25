import { TArrayString } from "../types/main";

export const delay = (timer: number) => new Promise<void>(
  resolve => setTimeout(resolve, timer)
);

export const swap = (arr: TArrayString[], firstIndex: number, endIndex: number): void => {
  [arr[firstIndex], arr[endIndex]] = [arr[endIndex], arr[firstIndex]]
}