import { mergeSort, searchInMergeSortedArray } from '../Ordenamientos/Arrays/Merge.mjs';
import { bubbleSort } from '../Ordenamientos/Arrays/Bubble.mjs';
import { radixBucketSort, searchInRadixSortedArray } from '../Ordenamientos/Arrays/radix.mjs';

import { LinkedList } from '../models/LinkedList.mjs';
import { bubbleSortLinkedList } from '../Ordenamientos/LinkedLists/BubbleLinkedlist.mjs';
import { mergeSortLinkedList } from '../Ordenamientos/LinkedLists/MargeLinkedlist.mjs';
import { radixSortLinkedList } from '../Ordenamientos/LinkedLists/RadixLinkedlist.mjs';

const ctxMerge = document.getElementById('mergeChart').getContext('2d');
const ctxBubble = document.getElementById('bubbleChart').getContext('2d');
const ctxRadix = document.getElementById('radixChart').getContext('2d');

const ctxSearchMerge = document.getElementById('searchMergeChart').getContext('2d');
const ctxSearchBubble = document.getElementById('searchBubbleChart').getContext('2d');
const ctxSearchRadix = document.getElementById('searchRadixChart').getContext('2d');

const mergeChart = new Chart(ctxMerge, {
    type: 'bar',
    data: {
        labels: ['Array', 'LinkedList'],
        datasets: [{
            label: 'Merge Sort',
            data: [0, 0], 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const bubbleChart = new Chart(ctxBubble, {
    type: 'bar',
    data: {
        labels: ['Array', 'LinkedList'],
        datasets: [{
            label: 'Bubble Sort',
            data: [0, 0], 
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const radixChart = new Chart(ctxRadix, {
    type: 'bar',
    data: {
        labels: ['Array', 'LinkedList'],
        datasets: [{
            label: 'Radix Sort',
            data: [0, 0],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const searchMergeChart = new Chart(ctxSearchMerge, {
    type: 'bar',
    data: {
        labels: ['Array', 'LinkedList'],
        datasets: [{
            label: 'Search Merge Sort',
            data: [0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const searchBubbleChart = new Chart(ctxSearchBubble, {
    type: 'bar',
    data: {
        labels: ['Array', 'LinkedList'],
        datasets: [{
            label: 'Search Bubble Sort',
            data: [0, 0],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const searchRadixChart = new Chart(ctxSearchRadix, {
    type: 'bar',
    data: {
        labels: ['Array', 'LinkedList'],
        datasets: [{
            label: 'Search Radix Sort',
            data: [0, 0],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

async function fetchData() {
    try {
        const response = await fetch('./bussines.json'); 
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function sortAndMeasure(sortFunction, structureType) {
    const data = await fetchData();
    let startTime, endTime, timeTaken;

    if (structureType === 'array') {
        startTime = performance.now();
        sortFunction(data.slice());
        endTime = performance.now();
    } else if (structureType === 'linkedlist') {
        const linkedList = LinkedList.fromArray(data.slice());
        startTime = performance.now();
        sortFunction(linkedList);
        endTime = performance.now();
    }

    timeTaken = endTime - startTime;
    return timeTaken;
}

async function searchAndMeasure(sortFunction, searchFunction, name, structureType) {
    const data = await fetchData();
    let sortedData, startTime, endTime, timeTaken, result;

    if (structureType === 'array') {
        sortedData = sortFunction(data.slice());
        startTime = performance.now();
        result = searchFunction(sortedData, 'name', name);
        endTime = performance.now();
    } else if (structureType === 'linkedlist') {
        const linkedList = LinkedList.fromArray(data.slice());
        sortedData = sortFunction(linkedList);
        startTime = performance.now();
        result = searchFunction(sortedData.toArray(), 'name', name);
        endTime = performance.now();
    }

    timeTaken = endTime - startTime;
    return { timeTaken, result };
}

document.getElementById('searchMerge').addEventListener('click', async () => {
    const name = document.getElementById('searchName').value;
    const arrayResult = await searchAndMeasure(mergeSort, searchInMergeSortedArray, name, 'array');
    const linkedListResult = await searchAndMeasure(mergeSortLinkedList, searchInMergeSortedArray, name, 'linkedlist');
    console.log(`Array Merge Sort: Time taken for search: ${arrayResult.timeTaken} ms`, arrayResult.result);
    console.log(`LinkedList Merge Sort: Time taken for search: ${linkedListResult.timeTaken} ms`, linkedListResult.result);

    searchMergeChart.data.datasets[0].data[0] = arrayResult.timeTaken;
    searchMergeChart.data.datasets[0].data[1] = linkedListResult.timeTaken;
    searchMergeChart.update();
});

document.getElementById('searchBubble').addEventListener('click', async () => {
    const name = document.getElementById('searchName').value;
    const arrayResult = await searchAndMeasure(bubbleSort, (arr, key, val) => arr.find(item => item[key] === val), name, 'array');
    const linkedListResult = await searchAndMeasure(bubbleSortLinkedList, (arr, key, val) => arr.find(item => item[key] === val), name, 'linkedlist');
    console.log(`Array Bubble Sort: Time taken for search: ${arrayResult.timeTaken} ms`, arrayResult.result);
    console.log(`LinkedList Bubble Sort: Time taken for search: ${linkedListResult.timeTaken} ms`, linkedListResult.result);

    searchBubbleChart.data.datasets[0].data[0] = arrayResult.timeTaken;
    searchBubbleChart.data.datasets[0].data[1] = linkedListResult.timeTaken;
    searchBubbleChart.update();
});

document.getElementById('searchRadix').addEventListener('click', async () => {
    const name = document.getElementById('searchName').value;
    const arrayResult = await searchAndMeasure(radixBucketSort, searchInRadixSortedArray, name, 'array');
    const linkedListResult = await searchAndMeasure(radixSortLinkedList, searchInRadixSortedArray, name, 'linkedlist');
    console.log(`Array Radix Sort: Time taken for search: ${arrayResult.timeTaken} ms`, arrayResult.result);
    console.log(`LinkedList Radix Sort: Time taken for search: ${linkedListResult.timeTaken} ms`, linkedListResult.result);

    searchRadixChart.data.datasets[0].data[0] = arrayResult.timeTaken;
    searchRadixChart.data.datasets[0].data[1] = linkedListResult.timeTaken;
    searchRadixChart.update();
});

document.getElementById('startArray').addEventListener('click', async () => {
    const mergeTime = await sortAndMeasure(mergeSort, 'array');
    mergeChart.data.datasets[0].data[0] = mergeTime;
    mergeChart.update();

    const bubbleTime = await sortAndMeasure(bubbleSort, 'array');
    bubbleChart.data.datasets[0].data[0] = bubbleTime;
    bubbleChart.update();

    const radixTime = await sortAndMeasure(radixBucketSort, 'array');
    radixChart.data.datasets[0].data[0] = radixTime;
    radixChart.update();
});

document.getElementById('startLinkedList').addEventListener('click', async () => {
    const mergeTime = await sortAndMeasure(mergeSortLinkedList, 'linkedlist');
    mergeChart.data.datasets[0].data[1] = mergeTime;
    mergeChart.update();

    const bubbleTime = await sortAndMeasure(bubbleSortLinkedList, 'linkedlist');
    bubbleChart.data.datasets[0].data[1] = bubbleTime;
    bubbleChart.update();

    const radixTime = await sortAndMeasure(radixSortLinkedList, 'linkedlist');
    radixChart.data.datasets[0].data[1] = radixTime;
    radixChart.update();
});
