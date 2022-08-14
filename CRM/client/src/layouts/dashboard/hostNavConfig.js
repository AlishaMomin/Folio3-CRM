// component
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const hostNavConfig = [
  {
    title: 'Dashboard',
    path: '/host/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Clients',
    path: '/host/companies',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Products',
    path: '/host/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Recievables',
    path: '/host/recievables',
    icon: getIcon('eva:file-text-fill'),
  },
];

export default hostNavConfig;
