import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleSorting from './sorting-page.module.css'
import { Direction } from "../../types/direction";
import { delay, getRandomInit, swap, swapArr } from "../../utils/utils";
import { TRandomArr } from "../../types/main";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { sortChecked } from "../../types/sort-checked";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

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
    Direction.Ascending ? setLoadingAsc(false) : setLoadingDes(false);
  }

  const bubbleSorting = async (direction: Direction) => {
    Direction.Ascending ? setLoadingAsc(true) : setLoadingDes(true);
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
    <SolutionLayout title="???????????????????? ??????????????">
      <div className={styleSorting.wrapper}>
        <div className={styleSorting.radio}>
          <RadioInput 
            label={'??????????'}
            value={sortChecked.selection}
            onChange={handleChecked}
            checked={checked === sortChecked.selection}
            disabled={isLoadingDes || isLoadingAsc}
          />
          <RadioInput
            label={'??????????????'}
            value={sortChecked.bubble}
            onChange={handleChecked}
            checked={checked === sortChecked.bubble}
            disabled={isLoadingDes || isLoadingAsc}
          />
        </div>
        <div className={styleSorting.buttons}>
          <Button
            text={'???? ??????????????????????'}
            sorting={Direction.Ascending}
            onClick={handleSortAscending}
            isLoader={isLoadingAsc}
            disabled={arr.length === 0 || isLoadingDes}
          />
          <Button
            text={'???? ????????????????'}
            sorting={Direction.Descending}
            onClick={handleSortDescending}
            isLoader={isLoadingDes}
            disabled={arr.length === 0 || isLoadingAsc}
          />
        </div>
        <Button
          text={'?????????? ????????????'}
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
