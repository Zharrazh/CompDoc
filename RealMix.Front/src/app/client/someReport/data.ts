import faker from 'faker';

export interface DataModel {
  id: number;
  name: string;
  status1: boolean;
  status2: boolean;
  status3: boolean;
  department: string;
  company: string;
  email: string;
  number: string;
  city: string;
  date: Date;
  time: number;
}

export const data: DataModel[] = [];

for (let i = 0; i < 1000; i++) {
  const date = faker.date.past(10);
  data.push({
    id: i,
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    status1: faker.random.boolean(),
    status2: faker.random.boolean(),
    status3: faker.random.boolean(),
    department: faker.random.arrayElement(['R&D', 'Sales', 'HR', 'Security', 'Logistics', 'Support', 'Finance']),
    company: faker.random.arrayElement(['Google', 'Apple', 'Microsoft', 'Netflix', 'Facebook']),
    email: faker.internet.email(),
    number: faker.phone.phoneNumber(),
    city: faker.address.city(),
    date: date,
    time: faker.random.number()
  });
}
