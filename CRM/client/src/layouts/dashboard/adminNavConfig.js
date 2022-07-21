// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const adminNavConfig = [
  {
    title: 'Admin Home',
    path: '/dashboard/adminhome',
    icon: getIcon('eva:people-fill'),
  },

  {
    title: 'LogOut',
    path: '/signin',
    icon: getIcon('eva:lock-fill'),
  },
];

export default adminNavConfig;
