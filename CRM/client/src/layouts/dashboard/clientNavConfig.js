// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const clientNavConfig = [
  {
    title: 'Client Dashboard',
    path: '/dashboard/clientdashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Client Transactions',
    path: '/dashboard/clienttransactions',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'LogOut',
    path: '/signin',
    icon: getIcon('eva:lock-fill'),
  }
];

export default clientNavConfig;
