import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const Orderline = [...Array(30)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: sample(['T3-1001','T3-1002','T3-1003','T3-1004','T3-1005','T3-1006','T3-1007','T3-1008','T3-1009','T3-1010','T3-1011','T3-1012','T3-1013','T3-1014','T3-1015','T3-1016','T3-1017','T3-1018','T3-1019','T3-1020','T3-1021','T3-1022','T3-1023','T3-1024','T3-1025','T3-1026','T3-1027','T3-1028','T3-1029','T3-1030']),
  PricePerUnit : faker.datatype.number(),
  Amount: faker.datatype.number(),
  Quantity: faker.datatype.number(),
  ProductId: faker.datatype.number(),
  OrderId: faker.datatype.number(),
}));

export default Orderline;
