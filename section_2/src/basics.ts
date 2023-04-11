const add = (
    n1: number,
    n2: number,
    showResult: boolean,
    resultPhrase: string
  ) => {
    if (showResult) {
      return console.log(`${resultPhrase} ${n1 + n2}`);
    } else {
      return n1 + n2;
    }
  };
  
  const number1 = 5;
  const number2 = 2.5;
  const printResult = true;
  const phrase = 'the result is';
  
  const result = add(number1, number2, printResult, phrase);
  
  console.log(result);
  