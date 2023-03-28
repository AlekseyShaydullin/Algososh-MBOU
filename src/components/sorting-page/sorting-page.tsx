import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleSorting from './sorting-page.module.css'
import { Direction } from "../../types/direction";
import { getRandomInit } from "../../utils/utils";
import { TRandomArr } from "../../types/main";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { sortChecked } from "../../types/sort-checked";
import { bubbleAlgorithm } from "./bubbleAlgorithm";
import { selectionSortAlgorithm } from "./selectionSortAlgorithm";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<Array<TRandomArr>>([]);
  const [checked, setChecked] = useState<sortChecked>(sortChecked.selection)
  const [isLoadingAsc, setLoadingAsc] = useState<boolean>(false);
  const [isLoadingDes, setLoadingDes] = useState<boolean>(false);

  const getRandomArr = (min: number, max: number, minLen: number, maxLen: number): void => {
    const randomArrLength = getRandomInit(minLen, maxLen);
    const randomArr: TRandomArr[] = [];

    for (let i = 0; i <= randomArrLength; i++) {
      randomArr.push({
        number: getRandomInit(min, max),
        state: ElementStates.Default
      })
    }
    setArr([...randomArr])
  }

  const getNewArr = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    getRandomArr(0, 100, 3, 17)
  }

  const handleChecked = (e: ChangeEvent<HTMLInputElement>): void => {
    setChecked(
      e.target.value === sortChecked.selection ? sortChecked.selection : sortChecked.bubble
    )
  }

  const selectionSort = async (direction: Direction) => {
    Direction.Ascending ? setLoadingAsc(true) : setLoadingDes(true);
    selectionSortAlgorithm(arr, setArr, direction);
    Direction.Ascending ? setLoadingAsc(false) : setLoadingDes(false);
  }

  const bubbleSorting = async (direction: Direction) => {
    Direction.Ascending ? setLoadingAsc(true) : setLoadingDes(true);
    bubbleAlgorithm(arr, setArr, direction)
    Direction.Ascending ? setLoadingAsc(false) : setLoadingDes(false);
  }

  const handleSortAscending = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sortArr(Direction.Ascending);
  }

  const handleSortDescending = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sortArr(Direction.Descending);
  }

  const sortArr = async (direction: Direction) => {    
    if (checked === sortChecked.selection) {
      selectionSort(direction);
    } else {
      bubbleSorting(direction);
    }
  };
  
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styleSorting.wrapper}>
        <div className={styleSorting.radio}>
          <RadioInput 
            label={'Выбор'}
            value={sortChecked.selection}
            onChange={handleChecked}
            checked={checked === sortChecked.selection}
            disabled={isLoadingDes || isLoadingAsc}
          />
          <RadioInput
            label={'Пузырёк'}
            value={sortChecked.bubble}
            onChange={handleChecked}
            checked={checked === sortChecked.bubble}
            disabled={isLoadingDes || isLoadingAsc}
          />
        </div>
        <div className={styleSorting.buttons}>
          <Button
            text={'По возрастанию'}
            sorting={Direction.Ascending}
            onClick={handleSortAscending}
            isLoader={isLoadingAsc}
            disabled={arr.length === 0 || isLoadingDes}
          />
          <Button
            text={'По убыванию'}
            sorting={Direction.Descending}
            onClick={handleSortDescending}
            isLoader={isLoadingDes}
            disabled={arr.length === 0 || isLoadingAsc}
          />
        </div>
        <Button
          text={'Новый массив'}
          onClick={getNewArr}
          extraClass={styleSorting.newArr}
          disabled={isLoadingDes || isLoadingAsc}
        />
      </div>
      <ul className={styleSorting.diagram}>
        {arr?.map((column, index) => {
          return(
            <li className={styleSorting.column} key={index}>
              <Column index={column.number} state={column.state} />
            </li>
          )
        })
        }
      </ul>
    </SolutionLayout>
  );
};
