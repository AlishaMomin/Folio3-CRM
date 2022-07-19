// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Add Company',
    path: '/dashboard/addcompany',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Admin Home',
    path: '/dashboard/adminhome',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Host Dashboard',
    path: '/dashboard/hostdashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Client Dashboard',
    path: '/dashboard/clientdashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Add Host Company',
    path: '/dashboard/addhostcompany',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Add Client Company',
    path: '/dashboard/addclientcompany',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Client Transactions',
    path: '/dashboard/clienttransactions',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Client Recievables',
    path: '/dashboard/clientrecievables',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Signin',
    path: '/signin',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
