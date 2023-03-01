import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Stack } from "../../utils/Stack";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleStack from './stack-page.module.css'

export const StackPage: React.FC = () => {
  const [letters, setLetters] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [stack, setStack] = useState<Stack<string>>(new Stack());
  const [stackArr, setStackArr] = useState<Array<string>>([])

  const changeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setLetters((e.target.value).trim())
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handlePush(e)
    }
  }

  const peek = (): number => {
    return stack.peek()
  }

const handlePush = async (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
  setLoading(true);
  e.preventDefault();
  if (letters !== '') {
    stack.push(letters);
    setStack(stack);
    setStackArr(stack.returnArr())
  }
  setLetters('');
  await delay(SHORT_DELAY_IN_MS);
  setLoading(false);
}

const handlePop = async (e: MouseEvent<HTMLButtonElement>) => {
  setLoading(true);
  e.preventDefault();
  await delay(SHORT_DELAY_IN_MS);
  stack.pop();
  setStack(stack);
  setStackArr([...stack.returnArr()]);
  setLoading(false);
}

const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setStack(new Stack());
  setStackArr([]);
}

  return (
    <SolutionLayout title="Стек">
      <div className={styleStack.wrapper}>
        <Input
          placeholder={'Введите цифру'}
          extraClass={styleStack.input}
          isLimitText={true}
          maxLength={4}
          onChange={changeValue}
          onKeyDown={handleEnter}
          value={letters}
        />
        <Button
          text={'Добавить'}
          onClick={handlePush}
          isLoader={isLoading}
          disabled={!letters}
        />
        <Button
          text={'Удалить'}
          onClick={handlePop}
          isLoader={isLoading}
          disabled={stackArr.length === 0}
        />
        <div className={styleStack.clear}>
          <Button
            text={'Очистить'}
            onClick={handleClear}
            isLoader={isLoading}
            disabled={stackArr.length === 0}
          />
        </div>
      </div>
      <ul className={styleStack.list}>
        {
        stackArr && stackArr.map((el: string, index: number) => {
          return (
            <li className={styleStack.letter} key={index}>
              <Circle
                letter={el}
                index={index}
                head={peek() === index ? 'top' : ''}
                state={isLoading && index === peek() ? ElementStates.Changing : ElementStates.Default}
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
