// 代码生成时间: 2025-09-21 23:56:19
const { performance } = require('perf_hooks');

// 冒泡排序算法
function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// 插入排序算法
function insertionSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// 快速排序算法
function quickSort(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return arr;
  }
  const pivot = arr[arr.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 测试排序算法性能
async function testSortingAlgorithms() {
  const testArray = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 100000));
  const start = performance.now();
  const sortedArray = bubbleSort([...testArray]);
  const end = performance.now();
  console.log(`Bubble sort took ${end - start} milliseconds`);

  const start2 = performance.now();
  const sortedArray2 = insertionSort([...testArray]);
  const end2 = performance.now();
  console.log(`Insertion sort took ${end2 - start2} milliseconds`);

  const start3 = performance.now();
  const sortedArray3 = quickSort([...testArray]);
  const end3 = performance.now();
  console.log(`Quick sort took ${end3 - start3} milliseconds`);
}

// 运行测试
testSortingAlgorithms();