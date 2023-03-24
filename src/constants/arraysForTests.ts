import { ElementStates } from "../types/element-states";

export const arrayOfOneElement = [{number: 44, state: ElementStates.Default}];

export const resultArrayOfOneElement = [{number: 44, state: ElementStates.Modified}];

export const arrayOfMultipleElements = [
  {number: 44, state: ElementStates.Modified},
  {number: 5, state: ElementStates.Modified},
  {number: 58, state: ElementStates.Modified},
  {number: 3, state: ElementStates.Modified},
  {number: 6, state: ElementStates.Modified},
  {number: 7, state: ElementStates.Modified}
];

export const resultArrayAsc = [
  {number: 3, state: ElementStates.Modified},
  {number: 5, state: ElementStates.Modified},
  {number: 6, state: ElementStates.Modified},
  {number: 7, state: ElementStates.Modified},
  {number: 44, state: ElementStates.Modified},
  {number: 58, state: ElementStates.Modified}
]

export const resultArrayDes = [
  {number: 58, state: ElementStates.Modified},
  {number: 44, state: ElementStates.Modified},
  {number: 7, state: ElementStates.Modified},
  {number: 6, state: ElementStates.Modified},
  {number: 5, state: ElementStates.Modified},
  {number: 3, state: ElementStates.Modified}
]