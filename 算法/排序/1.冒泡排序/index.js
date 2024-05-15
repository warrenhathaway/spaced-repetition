let arr = [65, 32, 88, 22, 3, 22]

/**
 * 稳定 O(n ** 2)
 */
function bubbleSort(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        let flag = true
        for(let j = 0; j < arr.length - 1 - i; j++) {
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
                flag = false
            }
        }
        if(flag) {
            return
        }
    }
}
bubbleSort(arr)

console.log(arr);