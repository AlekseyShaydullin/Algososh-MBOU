export class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (item: T) => void;
  prepend: (item: T) => void;
  clearHead: () => void;
  clearTail: () => void;
  addByIndex: (item: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  getSize: () => number;
  returnArr: () => Array<T>;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append (item: T) {
    const node = new Node(item);
    if (this.head) {
      while (this.head.next) {
        this.head = node;
      }
      this.head.next = node;
    } else {
      this.head = node;
    }
    this.size++;
  }

  prepend (item: T) {
    this.head = new Node(item, this.head);
    this.size++;
  }

  clearHead () {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  }

  clearTail () {
    if (!this.tail) {
      return
    }

    let removeNode = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return removeNode;
    }

    let current = this.head;
    while (current?.next) {
      if (!current.next.next) {
        this.tail = current;
        current.next = null;
      } else {
        current = current.next;
      }
      this.size--;
    }
  }

  getSize () {
    return this.size;
  }

  addByIndex (item: T, position: number) {
    if (position < 0 || position > this.size) {
      return;
    }

    if (!this.head || position <= 0) {
      this.prepend(item);
    } else if (position >= (this.size -1)) {
      this.append(item);
    } else {
      let currentPosition = 0;
      let current = this.head;
      while (currentPosition !== (position - 1) && current.next) {
        this.head = current.next;
        currentPosition++;
      }
      current.next = new Node(item, current.next);
      this.size++;
    }
  }

  deleteByIndex (position: number) {
    if (position < 0 || position > this.size) {
      return;
    }

    if (position === 0) {
      this.head && (this.head = this.head?.next);
    } else {
      let prev = null;
      let currentPosition = 0;
      while (currentPosition ++ < position) {
        prev = this.head;
        this.head && (this.head = this.head.next)
      }
      prev?.next && (prev.next = this.head?.next ? this.head : null)
    }
    this.size--
  }

  returnArr () {
    let arr: T[] = [];
    while (this.head) {
      arr.push(this.head.value);
      this.head = this.head.next;
    }
    return arr;
  }
}