import _ from 'lodash';
import { Product } from './product.model';
import { nanoid } from 'nanoid';

declare const global: string;

console.log(_.shuffle([1, 2, 3, 4, 5, 6]));

console.log(global);
console.log(nanoid());

const products = [
  { title: 'A carpet', price: 29.99 },
  { title: 'A Book', price: 12.99 },
];

const loadedProducts = products.map(
  (product) => new Product(product.title, product.price)
);

loadedProducts.forEach((el) => console.log(el.getInformation()));

// console.log(loadedProducts);

const p1 = new Product('book', 12.99);

console.log(p1.getInformation());
