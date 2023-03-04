import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { IListArr } from "../../types/main";
import { LinkedList } from "../../utils/List";
import { delay, listArr } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleList from './list-page.module.css'

export const ListPage: React.FC = () => {
  const [letters, setLetters] = useState<string>('');
  const [indexVal, setIndexVal] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<LinkedList<string>>(new LinkedList());
  const [listArray, setListArray] = useState<Array<IListArr>>(listArr)

  const changeValueLetters = (e: ChangeEvent<HTMLInputElement>): void => {
    setLetters((e.target.value).trim());
  }

  const changeValueIndex = (e: ChangeEvent<HTMLInputElement>): void => {
    setIndexVal(Number(e.target.value));
  }

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  const handleAddToHead = async(e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    list.prepend(letters);
    setList(list);
    if (listArray.length >= 0) {
      listArray[0].smallItem = {
        value: letters,
        state: ElementStates.Changing,
        style: 'add'
      }
    }
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray[0].smallItem = null;
    listArray.unshift({
      ...listArray[0],
      value: letters,
      state: ElementStates.Modified
    });
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray[0].state = ElementStates.Default;
    setListArray([...listArray]);
    setLetters('');
    setLoading(false);
  }

  const handleAddToTail = async(e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    list.append(letters);
    setList(list);
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      smallItem: {
        value: letters,
        state: ElementStates.Changing,
        style: 'add'
      }
    }
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray[listArray.length - 1] ={
      ...listArray[listArray.length - 1],
      smallItem: null
    }
    listArray.push({
      value: letters,
      state: ElementStates.Modified,
      smallItem: null
    });
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray[listArray.length - 1].state = ElementStates.Default;
    setListArray([...listArray]);
    setLetters('');
    setLoading(false);
  }

  const handleDeleteFromHead = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    listArray[0] = {
      ...listArr[0],
      value: '',
      smallItem: {
        value: listArray[0].value,
        state: ElementStates.Changing,
        style: 'del'
      }
    }
    list.clearHead();
    setList(list);
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray.shift();
    setListArray([...listArray]);
    setLoading(false);
  }

  const handleDeleteFromTail = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    listArray[listArray.length - 1] = {
      ...listArray[listArray.length - 1],
      value: '',
      smallItem: {
        value: listArray[listArray.length - 1].value,
        state: ElementStates.Changing,
        style: 'del'
      }
    }
    list.clearTail();
    setList(list);
    setListArray([...listArray]);
    await delay(SHORT_DELAY_IN_MS);
    listArray.pop();
    setListArray([...listArray]);
    setLoading(false);
  }

  const handleAddToIndex = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    list.addByIndex(letters, indexVal);
    setList(list);
    for (let i = 0; i <= indexVal; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing,
        smallItem: {
          value: letters,
          state: ElementStates.Changing,
          style: 'add'
        }
      }
      await delay(SHORT_DELAY_IN_MS);
      setListArray([...listArray]);
      if (i > 0) {
        listArray[i - 1] = {
          ...listArray[i - 1],
          smallItem: null
        }
      }
      setListArray([...listArray]);
    }
    await delay(SHORT_DELAY_IN_MS);
    listArray[indexVal] = {
      ...listArray[indexVal],
      state: ElementStates.Default,
      smallItem: null
    }
    listArray.splice(indexVal, 0, {
      value: letters,
      state: ElementStates.Modified,
      smallItem: null
    });
    setListArray([...listArray]);
    listArray[indexVal].state = ElementStates.Default;
    listArray.forEach(item => {
      item.state =ElementStates.Default
    });
    await delay(SHORT_DELAY_IN_MS);
    setListArray([...listArray]);
    setIndexVal(0);
    setLetters('');
    setLoading(false);
  }

  const handleDeleteByIndex = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    e.preventDefault();
    list.deleteByIndex(indexVal);
    for (let i = 0; i <= indexVal; i++) {
      listArray[i] = {
        ...listArray[i],
        state: ElementStates.Changing
      }
      await delay(SHORT_DELAY_IN_MS);
      setListArray([...listArray]);
    }
    listArray[indexVal] = {
      ...listArray[indexVal],
      value: '',
      smallItem: {
        value: listArray[indexVal].value,
        state: ElementStates.Changing,
        style: 'del'
      }
    }
    await delay(SHORT_DELAY_IN_MS);
    setListArray([...listArray]);
    listArray.splice(indexVal, 1);
    if (indexVal === 0) {
      listArray[indexVal - 1] = {
        ...listArray[indexVal - 1],
        value: listArray[indexVal - 1].value,
        state: ElementStates.Modified,
        smallItem: null
      }
    }
    listArray[indexVal - 1] = {
      ...listArray[indexVal - 1],
      value: listArray[indexVal - 1].value,
      state: ElementStates.Modified,
      smallItem: null
    }
    await delay(SHORT_DELAY_IN_MS);
    setListArray([...listArray]);
    listArray.forEach(item => {
      item.state = ElementStates.Default
    })
    await delay(SHORT_DELAY_IN_MS);
    setListArray([...listArray]);
    setIndexVal(1);
    setLoading(false);
  }

  const minInputIndex = 0;
  const maxInputIndex = listArray.length + 1;
  const limitedInput = !(minInputIndex <= indexVal && indexVal <= maxInputIndex);

  return (
    <SolutionLayout title="Связный список">
      <div className={styleList.wrapper}>
        <Input
          placeholder={'Введите значение'}
          extraClass={styleList.input}
          type={'text'}
          isLimitText={true}
          maxLength={4}
          onChange={changeValueLetters}
          onKeyDown={handleEnter}
          value={letters}
        />
        <Button
          text={'Добавить в head'}
          extraClass={styleList.button}
          onClick={handleAddToHead}
          isLoader={isLoading}
          disabled={!letters || listArray.length === 0}
        />
        <Button
          text={'Добавить в tail'}
          extraClass={styleList.button}
          onClick={handleAddToTail}
          isLoader={isLoading}
          disabled={!letters || listArray.length === 0}
        />
        <Button
          text={'Удалить из head'}
          extraClass={styleList.button}
          onClick={handleDeleteFromHead}
          isLoader={isLoading}
          disabled={isLoading || listArray.length === 0}
        />
        <Button
          text={'Удалить из tail'}
          extraClass={styleList.button}
          onClick={handleDeleteFromTail}
          isLoader={isLoading}
          disabled={isLoading || listArray.length === 0}
        />
      </div>
      <div className={styleList.wrapperIndex}>
        <Input
          placeholder={'Введите индекс'}
          extraClass={styleList.input}
          max={listArray.length + 1}
          type={'number'}
          onChange={changeValueIndex}
          onKeyDown={handleEnter}
          value={indexVal}
        />
        <Button
        text={'Добавить по индексу'}
        extraClass={styleList.buttonIndex}
        onClick={handleAddToIndex}
        isLoader={isLoading}
        disabled={limitedInput}
        />
        <Button
          text={'Удалить по индексу'}
          extraClass={styleList.buttonIndex}
          onClick={handleDeleteByIndex}
          isLoader={isLoading}
        />
      </div>
      <ul className={styleList.list}>
        {listArray.map((list: IListArr, index: number) => {
          return (
            <>
              <li className={styleList.li} key={index}>
                {list.smallItem && (
                  <Circle
                    isSmall
                    letter={list.smallItem.value}
                    state={list.smallItem.state}
                    extraClass={`${styleList[`${list.smallItem.style}`]}`}
                  />
                )}
                <Circle
                  letter={list.value}
                  state={list.state}
                  index={index}
                  head={index === 0 && !list.smallItem ? 'head' : ''}
                  tail={index === listArray.length - 1 && !list.smallItem ? 'tail' : ''}
                />
              </li>
              {index < listArray.length - 1 &&
                <ArrowIcon fill={list.state !== ElementStates.Changing ? '#0032FF' : '#D252E1'} />
              }
            </>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
