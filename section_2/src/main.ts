// UNION TYPES
const combineWithError = (input1: number | string, input2: number | string) => {
  const result = input1 + input2;
  return result;
};

const combine = (input1: number | string, input2: number | string) => {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    // one input could still be number or string so need to toString
    result = input1.toString() + input2.toString();
  }
  return result;
};

const combinedAges = combine(30, 26);

console.log(combinedAges);

const combinedNames = combine('Max', 'Anna');

console.log(combinedNames);

// LITERAL TYPES

const combineLiteral = (
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-text'
) => {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    // one input could still be number or string so need to toString
    result = input1.toString() + input2.toString();
  }
  return result;
};

console.log(combineLiteral(10, '20', 'as-number'));

// TYPE ALIAS / CUSTOM TYPE
type Combinable = number | string; // can be any name like a variable
type ConversionDescription = 'as-number' | 'as-text';

const combineAlias = (
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescription
) => {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    // one input could still be number or string so need to toString
    result = input1.toString() + input2.toString();
  }
  return result;
};

console.log(combineAlias(10, '20', 'as-number'));

export {};
