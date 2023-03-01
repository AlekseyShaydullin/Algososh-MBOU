export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peek: () => number;
  getSize: () => number;
  clear: () => void;
  returnArr: () => T[];
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  }

  pop = (): void => {
    this.container.pop();
  }

  getSize = (): number => this.container.length;

  peek = (): number => {
    return this.getSize() - 1;
  }

  clear = (): void => {
    this.container = []
  }

  returnArr = (): T[] => {
    return this.container;
  }
}