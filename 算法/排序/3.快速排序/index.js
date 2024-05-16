let arr = [65, 32, 88, 22, 3, 22]

/**
 * 时间复杂度 O(nlog2n) ~ O(n ** 2)
 * 空间复杂度 O(log2n) ~ O(n)
 * 不稳定
 */
function partition(arr, l, r) {
    let pivot = arr[l]
    let i = l, j = r
    while(i < j) {
        while(arr[j] >= pivot && i < j) --j
        arr[i] = arr[j]
        while(arr[i] <= pivot && i < j) ++i
        arr[j] = arr[i]
    }
    arr[i] = pivot
    return i
}

function quickSort(arr, l, r) {
    if(l < r) {
        let mid = partition(arr, l, r)
        quickSort(arr, l, mid - 1)
        quickSort(arr, mid + 1, r)
    }
}

quickSort(arr, 0, arr.length - 1)
console.log(arr);