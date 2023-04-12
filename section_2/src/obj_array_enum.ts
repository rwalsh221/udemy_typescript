const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'richard',
  age: 30,
  hobbies: ['sports', 'cooking'],
  role: [2, 'author'],
};

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person2 = {
  name: 'richard',
  age: 30,
  hobbies: ['sports', 'cooking'],
  role: Role.ADMIN,
};
console.log(Role[Role.ADMIN]);
console.log(person2);

person.role.push('hello');

let favoriteActivities: string[];
favoriteActivities = ['sports'];

console.log(person.name);
