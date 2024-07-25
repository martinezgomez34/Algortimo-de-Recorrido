import { LinkedList } from "../../models/LinkedList.mjs";

export function mergeSortLinkedList(linkedList) {
    if (linkedList.head === null || linkedList.head.next === null) {
        return linkedList;
    }

    const middle = getMiddle(linkedList.head);
    const leftHalf = new LinkedList();
    leftHalf.head = linkedList.head;
    leftHalf.tail = middle;
    const rightHalf = new LinkedList();
    rightHalf.head = middle.next;
    middle.next = null;

    return mergeLinkedLists(mergeSortLinkedList(leftHalf), mergeSortLinkedList(rightHalf));
}

function getMiddle(node) {
    if (node === null) return node;

    let slow = node;
    let fast = node.next;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

function mergeLinkedLists(left, right) {
    const mergedList = new LinkedList();
    let leftCurrent = left.head;
    let rightCurrent = right.head;

    while (leftCurrent !== null && rightCurrent !== null) {
        if (leftCurrent.data.name < rightCurrent.data.name) {
            mergedList.append(leftCurrent.data);
            leftCurrent = leftCurrent.next;
        } else {
            mergedList.append(rightCurrent.data);
            rightCurrent = rightCurrent.next;
        }
    }

    while (leftCurrent !== null) {
        mergedList.append(leftCurrent.data);
        leftCurrent = leftCurrent.next;
    }

    while (rightCurrent !== null) {
        mergedList.append(rightCurrent.data);
        rightCurrent = rightCurrent.next;
    }

    return mergedList;
}
