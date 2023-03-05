import { ElementStates } from "./element-states";

export type TArrayString = {
  letter?: string;
  state: ElementStates
};

export type TRandomArr = {
  number: number;
  state: ElementStates
};

export interface ISmallItem {
  value: string,
  state: ElementStates,
  style?: string
}

export interface IListArr {
  value: string,
  state: ElementStates,
  smallItem: ISmallItem | null
}