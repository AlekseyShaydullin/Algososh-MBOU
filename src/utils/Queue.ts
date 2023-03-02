export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | null;
  isEmpty: () => boolean;
  returnArr: () => Array<T | null>;
  getHead: () => number;
  getTail: () => number;
  getSize: () => number;
  getLength: () => number;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: Array<T | null> = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  isEmpty = () => this.length === 0;

  returnArr = () => this.container;

  getHead = () => this.head;

  getTail = () => this.tail;

  getSize = () => this.size;

  getLength = () => this.length;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }

    if (!this.isEmpty()) {
      this.tail = (this.tail + 1) % this.size;
    }
    this.container[this.tail] = item;
    this.length ++;
  }

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    this.container[this.head] = null;
    this.head++;
    this.length--;
  }

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return this.container[this.head];
  }

  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }
}