import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  hostcompany: faker.company.companyName(),
  noofclient: faker.datatype.number(),
  status: sample(['active', 'banned']),
  isVerified: faker.datatype.boolean(),
  company: faker.company.companyName(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));

export default users;
