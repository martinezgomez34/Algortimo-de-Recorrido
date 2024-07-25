class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(data) {
        const newNode = new Node(data);
        if (this.tail === null) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    toArray() {
        const array = [];
        let current = this.head;
        while (current !== null) {
            array.push(current.data);
            current = current.next;
        }
        return array;
    }

    static fromArray(array) {
        const linkedList = new LinkedList();
        for (const item of array) {
            linkedList.append(item);
        }
        return linkedList;
    }

    getSize() {
        return this.size;
    }
}

