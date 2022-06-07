// 一维数组转二维数组
export function arr1ToArr2(arr, num): Array<any> {
    const newArr = [];
    while(arr.length > 0) {
        newArr.push(arr.splice(0, num));
    }
    return newArr;
}

