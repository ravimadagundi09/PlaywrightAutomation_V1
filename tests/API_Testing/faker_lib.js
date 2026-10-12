//npm install @faker-js/faker --save-dev

import { faker } from "@faker-js/faker";

console.log(faker.person.firstName())
console.log(faker.person.lastName())

console.log(faker.internet.email())
console.log(faker.date.month())
