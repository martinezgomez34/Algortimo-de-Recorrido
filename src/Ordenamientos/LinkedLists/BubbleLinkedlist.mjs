import { LinkedList } from "../../models/LinkedList.mjs";

export function bubbleSortLinkedList(linkedList, limit = 10000) {
    let n = Math.min(linkedList.getSize(), limit);
    let swapped;
    do {
        swapped = false;
        let current = linkedList.head;

        for (let i = 0; i < n - 1; i++) {
            if (current && current.next && current.data.name > current.next.data.name) {
                let temp = current.data;
                current.data = current.next.data;
                current.next.data = temp;
                swapped = true;
            }
            current = current.next;
        }
        n--;
    } while (swapped && n > 1);

    return linkedList;
}
