export function bubbleSort(arr, limit = 10000) {
    let n = Math.min(arr.length, limit);
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i].name > arr[i + 1].name) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        n--;
    } while (swapped && n > 1);
    return arr;
}
