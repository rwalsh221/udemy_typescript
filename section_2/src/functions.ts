const add2 = (n1: number, n2: number): number => {
  return n1 + n2;
};

const printResult2 = (num: number) => {
  console.log(`result is ${num}`);
};

const addAndHandle = (n1: number, n2: number, cb: (a: number) => void) => {
  const result = n1 + n2;
  cb(result);
};

printResult2(add2(2, 10));

let combineValues: (a: number, b: number) => number;

combineValues = add2;

console.log(combineValues(8, 4));
// console.log(add);

addAndHandle(10, 20, (result) => {
  console.log(result);
});
addAndHandle(10, 20, (result) => {
  let test = result + 50;
  console.log(test);
  return result;
});

export {};
