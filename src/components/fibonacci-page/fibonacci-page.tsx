import React, { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleFibo from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<string | number>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [arrFibo, setArrFibo] = useState<number[] | null>(null)

  const changeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const fibNumber = Number((e.target.value).trim());
    if (fibNumber < 1 || fibNumber > 19) {
      setNumber('');
    } else {
      setNumber(fibNumber);
    }
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if(e.key === 'Enter') {
      getFibonacci(e);
    }
  }

  const fib = async (n: string | number) => {
    setLoading(true);
    let prev: number = 0
    let next: number = 1
    const renderFibo: number[] = []

    for (let i = 0; i <= n; i++) {
      let temp = next;
      next = prev + next;
      prev = temp
      renderFibo.push(prev)
      setArrFibo([...renderFibo])
      await delay(SHORT_DELAY_IN_MS);
    }
    setLoading(false);
  }
  
  const getFibonacci = (e: FormEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    fib(number);
    setNumber('');
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
            <form className={styleFibo.form} data-cy={'form'}>
        <div className={styleFibo.wrapper}>
          <Input 
            placeholder={'Введите число от 1 до 19'}
            type={'number'}
            isLimitText={true}
            max={19}
            onChange={changeValue}
            onKeyDown={handleEnter}
            value={number}
            data-cy={'input'}
          />
          <Button
            text={'Рассчитать'}
            onClick={getFibonacci}
            isLoader={isLoading}
            disabled={!number}
            data-cy={'submit'}
          />
        </div>
        <ul className={styleFibo.list}>
          {
            arrFibo && arrFibo.map((el: number, index: number) => {
              return(
                <li className={styleFibo.letter} key={index}>
                  <Circle letter={String(el)} index={index} />
                </li>
              )
            })
          }
        </ul>
      </form>
    </SolutionLayout>
  );
};