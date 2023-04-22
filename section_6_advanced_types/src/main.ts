type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'max',
  privileges: ['exampe'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// return a.toString() + b.toString();
// function add(a: number, b: number): number;
const add = (a: Combinable, b: Combinable) => {
  if (typeof a === 'string' || typeof b === 'string') {
    return (a.toString() + b.toString()) as string;
  }

  return a + b;
};

const result = add('max', 'fred');
// result.split(' ');

type UnknownEmployee = Employee | Admin;

const printEmployeeInfo = (emp: UnknownEmployee) => {
  console.log(emp.name);
  if ('privileges' in emp) {
    console.log(emp.privileges);
  }
  if ('startDate' in emp) {
    console.log(emp.startDate);
  }
};

printEmployeeInfo(e1);

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
  let speed;
  let moving;
  switch (animal.type) {
    case 'bird':
      moving = 'flying';
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      moving = 'running';
      speed = animal.runningSpeed;
      break;
  }
  console.log(`${moving} at speed: ${speed}`);
};

moveAnimal({ type: 'bird', flyingSpeed: 30 });

// const paragraph = document.querySelector('p');
const paragraph = document.getElementById('message-output');

// const userInput = <HTMLInputElement>document.getElementById('user-input')!;

// ! MEANS WONT BE NULL
const userInput = document.getElementById('user-input')! as HTMLInputElement;

userInput.value = 'Hello';

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not an email',
};

const fetchedUserData = {
  id: 'u1',
  name: 'max',
  job: { title: 'ceo', description: 'My company' },
};

console.log(fetchedUserData?.job.title);
