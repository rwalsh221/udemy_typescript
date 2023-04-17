type Addfn = (a: number, b: number) => number;

interface Addfn2 {
  (a: number, b: number): number;
}

let add: Addfn;

interface Named {
  readonly name: string;
  outPutname?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  constructor(n: string) {
    this.name = n;
  }

  name: string;
  age = 30;

  greet(phrase: string): void {
    console.log(`${phrase} ${this.name}`);
  }
}

let user1: Greetable;

user1 = new Person('Max');
console.log(user1);
user1.greet('hello');
// user1.name = 'test';
console.log(user1.name);
