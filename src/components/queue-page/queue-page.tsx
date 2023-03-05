import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Queue } from "../../utils/Queue";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleQueue from './queue-page.module.css'

export const QueuePage: React.FC = () => {
  const [letters, setLetters] = useState<string>('');
  const [isLoadingEnq, setLoadingEnq] = useState<boolean>(false);
  const [isLoadingDeq, setLoadingDeq] = useState<boolean>(false);
  const [queue, setQueue] = useState<Queue<string>>(new Queue(7));
  const [queueArr, setQueueArr] = useState<Array<string | null>>([...queue.returnArr()]);
  const [current, setCurrent] = useState<number>(-1)

  const changeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setLetters((e.target.value).trim())
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && letters !== '' && length() < 7) {
      handleEnqueue(e);
    }
  }

  const head = (): number => {
    return queue.getHead();
  }

  const tail = (): number => {
    return queue.getTail();
  }

  const size = (): number => {
    return queue.getSize();
  }

  const length = (): number => {
    return queue.getLength()
  }

  const handleEnqueue = async (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    setLoadingEnq(true);
    e.preventDefault();
    if (letters !== '') {
      queue.enqueue(letters);
      setQueue(queue);
      setCurrent(tail());
      setQueueArr([...queue.returnArr()]);
      await delay(SHORT_DELAY_IN_MS);
      setCurrent(-1);
    }
    setLetters('');
    await delay(SHORT_DELAY_IN_MS);
    setLoadingEnq(false);
  }

  const handleDequeue = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoadingDeq(true);
    e.preventDefault();
    if (queue) {
      setCurrent(head());
      queue.dequeue();
      setQueue(queue);
      setQueueArr([...queue.returnArr()]);
      setCurrent(-1);
      await delay(SHORT_DELAY_IN_MS);
    }
    setLoadingDeq(false);
  }

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    queue.clear();
    setQueueArr([...queue.returnArr()]);
  }

  const isLoading = isLoadingDeq || isLoadingEnq;

  return (
    <SolutionLayout title="Очередь">
      <div className={styleQueue.wrapper}>
        <Input
          placeholder={'Введите значение'}
          extraClass={styleQueue.input}
          isLimitText={true}
          maxLength={4}
          onChange={changeValue}
          onKeyDown={handleEnter}
          value={letters}
        />
        <Button
          text={'Добавить'}
          onClick={handleEnqueue}
          isLoader={isLoadingEnq}
          disabled={!letters || isLoadingDeq || size() > 7}
        />
        <Button
          text={'Удалить'}
          onClick={handleDequeue}
          isLoader={isLoadingDeq}
          disabled={queue.isEmpty() || isLoadingEnq}
        />
        <div className={styleQueue.clear}>
          <Button
            text={'Очистить'}
            onClick={handleClear}
            disabled={queue.isEmpty() || isLoading}
          />
        </div>
      </div>
      <ul className={styleQueue.list}>
        {queueArr && queueArr.map((el, index: number) => {
          return(
            <Circle
              letter={typeof el === "string" ? el : ""}
              key={index}
              index={index}
              head={index === head() ? 'head' : ''}
              tail={index === tail() ? 'tail' : ''}
              state={isLoading && index === current ? ElementStates.Changing : ElementStates.Default}
            />
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
