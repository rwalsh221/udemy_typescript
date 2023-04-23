const names: Array<string> = ['max', 'richard'];
names.push();

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('this is done');
  }, 2000);
});

promise.then((data) => {
  data.split(' ');
});

const merge = <T extends object, U extends object>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

const merge2 = (objA: { test: string }, objB: object) => {
  return Object.assign(objA, objB);
};

const test3 = merge2({ test: 'test' }, { test2: 'test2' });
console.log(test3.test);

const test = merge<{ name: string; hobbies: string[] }, { age: number }>( // <> not needed just example
  { name: 'max', hobbies: ['test'] },
  { age: 30 }
);
console.log(test.age);

// const test2 = merge(30, { name: 'helo' });

interface Lengthy {
  length: number;
}

const countAndPrint = <T extends Lengthy>(el: T): [T, string] => {
  let description = 'got no value';
  if (el.length === 0) {
    description = `got 1 element`;
  }
  if (el.length > 1) {
    description = `got ${el.length} elements`;
  }
  return [el, description];
};

console.log(countAndPrint('Hi there!'));
console.log(countAndPrint(['test', 'test2']));
// console.log(countAndPrint(10));

const extractAndConvert = <T extends object, U extends keyof T>(
  obj: T,
  key: U
) => {
  return obj[key];
};

extractAndConvert({ name: 'max', age: 40 }, 'age');

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string | number>();
textStorage.addItem('max');
textStorage.addItem(20);
textStorage.removeItem('max');
console.log(textStorage.getItems());

const objectStorage = new DataStorage<object>();

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

const creatCourseGoal = (title, description, date) => {
  return { title: title, description: description, completeDate: date };
};
