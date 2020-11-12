// common JS:
const Person = require('./person');

// this doesn't work in node (ES6):
// import Person from './person';

const person1 = new Person("John", 30);

console.log(__filename);
person1.greeting();
