import { LinkedList } from "../../models/LinkedList.mjs";

export function radixSortLinkedList(linkedList, key) {
    const items = linkedList.toArray();
    if (items.length <= 1) {
        return linkedList;
    }

    let maxLen = 0;
    for (const item of items) {
        if (item && item[key]) {
            maxLen = Math.max(maxLen, item[key].length);
        }
    }

    for (let radix = maxLen - 1; radix >= 0; radix--) {
        const buckets = {};

        for (let i = 0; i < 256; i++) {
            buckets[String.fromCharCode(i)] = new LinkedList();
        }

        for (const item of items) {
            const curr = item[key] || '';
            const radixKey = radix < curr.length ? getCharAt(curr, radix) : 0;
            const bucketKey = String.fromCharCode(radixKey);

            if (!buckets[bucketKey]) {
                buckets[bucketKey] = new LinkedList();
            }

            buckets[bucketKey].append(item);
        }

        items.length = 0;
        for (let i = 0; i < 256; i++) {
            const bucket = buckets[String.fromCharCode(i)];
            if (bucket) {
                const bucketArray = bucket.toArray();
                for (const item of bucketArray) {
                    items.push(item);
                }
            }
        }
    }

    return LinkedList.fromArray(items);
}

function getCharAt(str, index) {
    return str.charCodeAt(index);
}
