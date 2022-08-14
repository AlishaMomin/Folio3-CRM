// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const adminNavConfig = [
  {
    title: 'Admin',
    path: '/admin/home',
    icon: getIcon('eva:people-fill'),
  },
];

export default adminNavConfig;
