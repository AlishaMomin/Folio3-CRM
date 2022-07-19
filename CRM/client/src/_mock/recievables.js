import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const Orders = [...Array(30)].map((_, index) => ({
  id: faker.datatype.uuid(),
  OrderName: sample(['T3-1001','T3-1002','T3-1003','T3-1004','T3-1005','T3-1006','T3-1007','T3-1008','T3-1009','T3-1010','T3-1011','T3-1012','T3-1013','T3-1014','T3-1015','T3-1016','T3-1017','T3-1018','T3-1019','T3-1020','T3-1021','T3-1022','T3-1023','T3-1024','T3-1025','T3-1026','T3-1027','T3-1028','T3-1029','T3-1030']),
  FromCompany: faker.company.companyName(),
  Amount: faker.datatype.number(),
  InvoiceStatus: sample(['Unpaid']),
  OrderDate: sample(['21-05-2020','22-06-2021','23-05-2020','22-07-2021','21-05-2019','25-06-2021']),
  LastDate: sample(['21-05-2022','22-06-2022','23-05-2022','22-07-2023','21-05-2022','25-06-2022']),
}));

export default Orders;
