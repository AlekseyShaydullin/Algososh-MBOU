import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styleString from './string.module.css';

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <form className={styleString.form}>
        <div className={styleString.wrapper}>
          <Input 
            placeholder={'Введите текст'}
            type={'text'}
            isLimitText={true}
            maxLength={11}
          />
          <Button
            text={'Развернуть'}
          />
        </div>
        
      </form>
    </SolutionLayout>
  );
};
