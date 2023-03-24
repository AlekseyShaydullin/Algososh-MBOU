import React, { ChangeEvent, KeyboardEvent, FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArrayString } from "../../types/main";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { reverseAlgorithm } from "./reverseAlgorithm";
import styleString from './string.module.css';

export const StringComponent: React.FC = () => {
  const [letters, setLetters] = useState<string>('');
  const [reverse, setReverse] = useState<TArrayString[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  
  const changeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setLetters((e.target.value).trim());
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if(e.key === 'Enter') {
      getReverse(e);
    }
  }

  const reverseString = async (items: string) => {
    setLoading(true);
    const arr = items.split('').map(letter => ({letter, state: ElementStates.Default}));
    setReverse(arr);
    await delay(SHORT_DELAY_IN_MS);
    reverseAlgorithm(arr, setReverse);
    setLoading(false);
  }

  const getReverse = (e: FormEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    reverseString(letters);
    setLetters('');
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styleString.form}>
        <div className={styleString.wrapper}>
          <Input 
            placeholder={'Введите текст'}
            isLimitText={true}
            maxLength={11}
            onChange={changeValue}
            onKeyDown={handleEnter}
            value={letters}
          />
          <Button
            text={'Развернуть'}
            onClick={getReverse}
            isLoader={isLoading}
            disabled={!letters}
          />
        </div>
        <ul className={styleString.list}>
          {
            reverse && reverse.map((el: TArrayString, index: number) => {
              return(
                <li className={styleString.letter} key={index}>
                  <Circle letter={el.letter} state={el.state}/>
                </li>
              )
            })
          }
        </ul>
      </form>
    </SolutionLayout>
  );
};
