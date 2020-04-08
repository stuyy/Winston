// eslint-disable-next-line import/prefer-default-export
export function asyncForEach(arr: Array<any>, cb: Function) {
  for (let i = 0; i < arr.length; i++) {
    cb(arr[i], i, arr);
  }
}
