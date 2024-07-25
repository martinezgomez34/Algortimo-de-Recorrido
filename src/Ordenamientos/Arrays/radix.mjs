function getCharAt(str, index) {
    return index < str.length ? str.charCodeAt(index) : 0;
}


export function radixBucketSort(arr, key) {
    if (arr.length <= 1) {
        return arr;
    }

    let maxLen = 0;
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (item && item[key]) {
            maxLen = Math.max(maxLen, item[key].length);
        }
    }

    let len2 = 256;

    for (let radix = maxLen - 1; radix >= 0; radix--) {
        let buckets = {};
        

        for (let i = 0; i < len2; i++) {
            buckets[String.fromCharCode(i)] = [];
        }

        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            let curr = item[key] || '';
            let radixKey = radix < curr.length ? getCharAt(curr, radix) : 0;
            let bucketKey = String.fromCharCode(radixKey);

            if (!buckets[bucketKey]) {
                buckets[bucketKey] = [];
            }
            
            buckets[bucketKey].push(item);
        }

        let index = 0;
        for (let i = 0; i < len2; i++) {
            let char = String.fromCharCode(i);
            if (buckets[char]) {
                let bucket = buckets[char];
                for (let j = 0; j < bucket.length; j++) {
                    arr[index++] = bucket[j];
                }
            }
        }
    }

    return arr;
}

export function searchInRadixSortedArray(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}
