type Combinable = 'as-number' | 'as-text';

const combine = (
  input1: number | string,
  input2: number | string,
  resultType: Combinable
) => {
  let result;
  console.log(resultType);
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
};

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedNames = combine('max', 20, 'as-number');

const combinedNames2 = combine('max', 'anna', 'as-number');
console.log(combinedNames);
console.log(combinedNames2);
export {};
