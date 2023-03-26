import { faker } from '@faker-js/faker';


const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  date: faker.date.between(),
}));

export default users;
