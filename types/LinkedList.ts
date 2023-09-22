export class Node {
  constructor(data: unknown, next: null | Node = null) {
    this.data = data;
    this.next = next;
  }
  data: unknown;
  next: null | Node;
}

export type LinkedListItem = Node | null;

export class LinkedList {
  #head: LinkedListItem;
  #tail: LinkedListItem;
  static view: () => void;

  constructor(root: LinkedListItem = null) {
    this.#head = this.#tail = root;
  }

  push(data: unknown) {
    const node = new Node(data);
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
      const stop = callback(current);
      if (stop) {
        break;
      }
      current = current.next;
    }
  }

  isLastItem(node: Node) {
    return this.#tail === node;
  }

  async find(func: (node: Node) => any) {
    return new Promise((resolve, reject) => {
      let temp: null | Node = null;
      let end = false;
      const id = setInterval(() => {
        if (end === true) {
          clearInterval(id);
        }
        resolve(temp);
      }, 1);

      this.each((node: Node) => {
        if (this.isLastItem(node)) {
          end = true;
        }
        if (func(node)) {
          temp = node;
          end = true;
          return 1;
        }
      });
    });
  }

  isEmpty() {
    return this.#head === null;
  }

  async del(node: Node) {
    if (this.#head === node) {
      this.#head = node.next;
      return 1;
    }

    const parent = (await this.find((_node) => {
      return _node.next === node;
    })) as Node;

    if (parent) {
      parent.next = node.next;
      if (this.#tail === node) {
        this.#tail = parent;
      }
      return 1;
    }
    return 0;
  }

  count() {
    let count = 0;
    let current = this.#head
    while(current) {
      count++;
      current = current.next;
    }
    return count;
  }

  async insert(data: unknown, index: number) {
    if(this.isEmpty()) {
      this.push(data);
      return 1;
    }
    const node = new Node(data)

    if (index === 0) {
      node.next = this.#head;
      this.#head = node;
      return 1
    }

    let count = 0;
    const current = await this.find((node) => {
      if(count === index) {
        return 1;
      }
      count++;
    }) as Node;

    if (!current) {
      return 0;
    }

    const temp = current.next;
    current.next = node;
    node.next = temp;
    if (current === this.#tail) {
      this.#tail = node;
    }
  }
}
