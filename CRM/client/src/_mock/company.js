import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const companies = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  CompanyName: faker.company.companyName(),
  noofclient: faker.datatype.number(),
  nameC1: faker.name.findName(),
  nameC2: faker.name.findName(),
  phoneC1: faker.datatype.number(),
  phoneC2: faker.datatype.number(),
  status: sample(['active', 'banned']),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
}));

export default companies;
