// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const hostNavConfig = [
  // Company dashboard
  {
    title: 'Host Dashboard',
    path: '/dashboard/hostdashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Client Companies',
    path: '/dashboard/clientcompanies',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Host Products',
    path: '/dashboard/hostproducts',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Client Recievables',
    path: '/dashboard/clientrecievables',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'LogOut',
    path: '/signin',
    icon: getIcon('eva:lock-fill'),
  },
];

export default hostNavConfig;
