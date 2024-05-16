let arr = [65, 32, 88, 22, 3, 22]

/**
 * 不稳定 O(n ** 2)
 */
function selectSort(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        let min = i
        for(let j = i + 1; j < arr.length; j++) {
            if(arr[j] < arr[min]) {
                min = j
            }
        }
        let temp = arr[i]
        arr[i] = arr[min]
        arr[min] = temp

    }
}
selectSort(arr)

console.log(arr);