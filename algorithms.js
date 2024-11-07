// Bubble Sort Algorithm Generator Function
function* bubbleSort(arr) {
    var swapped = false; // Flag to check if any swapping happened in the current iteration
    console.log("in");

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            // Compare adjacent elements and swap if needed
            if (compare(arr, j, j + 1)) {
                swap(arr, j, j + 1);
                swapped = true;
            }
            yield; // Yield control to allow visualization update
        }
    }
    if (swapped == false) {
        return; // If no swapping happened, the array is already sorted
    }
}

// Selection Sort Algorithm Generator Function
function* selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i; // Assume the current index is the minimum
        for (let j = i + 1; j < arr.length; j++) {
            if (compare(arr, minIdx, j)) {
                minIdx = j; // Update the index of the minimum element
            }
            yield; // Yield control to allow visualization update
        }
        swap(arr, i, minIdx); // Swap the found minimum element with the first element
        yield; // Yield control to allow visualization update
    }
}

// Merge Sort Algorithm Generator Function
function* mergeSort(arr) {
    yield* _mergeSort(arr, 0, arr.length - 1); // Call the recursive merge sort helper function
}

// Recursive Merge Sort Helper Function
function* _mergeSort(arr, l, r) {
    if (l >= r) return; // Base case: If the array has one or no elements
    const m = l + Math.floor((r - l) / 2); // Find the middle point
    yield* _mergeSort(arr, l, m); // Sort the first half
    yield* _mergeSort(arr, m + 1, r); // Sort the second half
    yield* _merge(arr, l, m, r); // Merge the sorted halves
}

// Merge Helper Function
function* _merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    let L = new Array(n1); // Create temp arrays
    let R = new Array(n2);
    for (let i = 0; i < n1; i++) L[i] = arr[l + i]; // Copy data to temp arrays
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        find_and_compare(L[i].val, R[j].val); // Visualize comparison
        if (L[i].val < R[j].val) {
            find_and_swap(arr[k].val, L[i].val); // Visualize swap
            arr[k] = L[i];
            k++;
            i++;
        } else {
            find_and_swap(arr[k].val, R[j].val); // Visualize swap
            arr[k] = R[j];
            k++;
            j++;
        }
        yield; // Yield control to allow visualization update
    }

    while (i < n1) {
        find_and_swap(arr[k].val, L[i].val); // Visualize swap
        arr[k++] = L[i++];
        yield; // Yield control to allow visualization update
    }

    while (j < n2) {
        find_and_swap(arr[k].val, R[j].val); // Visualize swap
        arr[k++] = R[j++];
        yield; // Yield control to allow visualization update
    }
}

// Quick Sort Algorithm Generator Function using Lomuto Partition Scheme
function* quickSortLomuto(arr) {
    yield* _quickSortLomuto(arr, 0, arr.length - 1); // Call the recursive quick sort helper function
}

// Recursive Quick Sort Helper Function using Lomuto Partition Scheme
function* _quickSortLomuto(arr, left, right) {
    if (left >= right) {
        return; // Base case: If the array has one or no elements
    }
    let partitionGenerator = _partitionLomuto(arr, left, right); // Partition the array

    let result = partitionGenerator.next();
    while (!result.done) {
        result = partitionGenerator.next(); // Continue partitioning until done
        yield 1; // Yield control to allow visualization update
    }

    let idx = result.value; // Get the partition index
    yield* _quickSortLomuto(arr, left, idx - 1); // Sort the left part
    yield* _quickSortLomuto(arr, idx + 1, right); // Sort the right part
}

// Lomuto Partition Scheme Helper Function
function* _partitionLomuto(arr, left, right) {
    let pivot = arr[right].val; // Choose the rightmost element as pivot
    let i = left - 1;
    for (let j = left; j < right; j++) {
        arr[right].pivot = true; // Visualize pivot
        if (arr[j].val < pivot) {
            compare(arr, j, right); // Visualize comparison
            swap(arr, ++i, j); // Swap elements if needed
            yield; // Yield control to allow visualization update
        }
    }
    swap(arr, i + 1, right); // Swap the pivot element to its correct position
    yield; // Yield control to allow visualization update
    return i + 1; // Return the partition index
}

// Swap Helper Function
function swap(arr, x, y) {
    arr[x].swap = true; // Visualize swap
    arr[y].swap = true;

    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}

// Compare Helper Function
function compare(arr, x, y) {
    arr[x].compare = true; // Visualize comparison
    arr[y].compare = true;
    return arr[x].val > arr[y].val;
}

// Find and Compare Helper Function
function find_and_compare(val1, val2) {
    let index_1 = 0, index_2 = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].val == val1) {
            index_1 = i;
        }
        if (arr[i].val == val2) {
            index_2 = i;
        }
    }
    arr[index_1].compare = true; // Visualize comparison
    arr[index_2].compare = true;
}

// Find and Swap Helper Function
function find_and_swap(val1, val2) {
    let index_1 = 0, index_2 = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].val == val1) {
            index_1 = i;
        }
        if (arr[i].val == val2) {
            index_2 = i;
        }
    }
    arr[index_1].swap = true; // Visualize swap
    arr[index_2].swap = true;
}
