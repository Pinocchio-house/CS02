export class Node {
  constructor(data: unknown, next: null | Node = null) {
    this.data = data;
    this.next = next;
  }
  data: unknown;
  next: null | Node;
}

type LinkedListItem = Node | null;

export class LinkedList {
  #head: LinkedListItem;
  #tail: LinkedListItem;

  constructor(root: LinkedListItem = null) {
    this.#head = this.#tail = root;
  }

  push(data: unknown) {
    const node = new Node(data)
    if (!this.#head || !this.#tail) {
      this.#head = this.#tail = node;
      return;
    }

    this.#tail.next = node;
    this.#tail = node;
  }

  pop() {
    if (!this.#head) {
      return null;
    }
    let temp: LinkedListItem = this.#tail;
    if (this.#head === this.#tail) {
      this.#head = this.#tail = null;
      return temp;
    }
    let parent: Node = this.#head;

    while (parent.next !== this.#tail) {
      parent = parent.next!;
    }
    parent.next = null;
    return temp;
  }

  each(callback: Function) {
    let current = this.#head;

    while (current) {
      callback(current);
      current = current.next;
    }
  }
}

