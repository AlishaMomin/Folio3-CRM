// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const clientNavConfig = [
  {
    title: 'Dashboard',
    path: '/client/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Transactions',
    path: '/client/transactions',
    icon: getIcon('eva:file-text-fill'),
  },
];

export default clientNavConfig;
