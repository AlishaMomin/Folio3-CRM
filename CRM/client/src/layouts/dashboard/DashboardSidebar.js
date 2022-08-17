import PropTypes from 'prop-types';
import { useEffect,useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';

// imports of nav components
import adminNavConfig from './adminNavConfig';
import hostNavConfig from './hostNavConfig';
import clientNavConfig from './clientNavConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar, userRole }) {

  const { pathname } = useLocation();

  const [UserRole, setUserRole] = useState('');

  const [UserName, setUserName] = useState('');

  const [UserCompany, setUserCompany] = useState('');

  const [UserHostCompany, setUserHostCompany] = useState('');

  const isDesktop = useResponsive('up', 'lg');

  console.log('userRole', userRole);

  useEffect(() => {
    setUserName(localStorage.getItem('Name'));

    setUserCompany(localStorage.getItem('CompanyName'));


    if (parseInt(localStorage.getItem('ROLE'),10) === 3)
    {
      setUserRole(`${localStorage.getItem('RoleName')} of ${localStorage.getItem('HostCompanyName')}`);
    }
    if (parseInt(localStorage.getItem('ROLE'),10) === 2 || parseInt(localStorage.getItem('ROLE'),2) === 1 )
    {
      setUserRole(localStorage.getItem('RoleName'));
    }
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const getNav = () => {
    console.log("CHECKKK", userRole);
    if (userRole > 0 && userRole < 2) {
      return (
      <NavSection navConfig={adminNavConfig} />
      )

    }
    if (userRole > 1 && userRole < 3) {
      console.log("skcbsisc")
      return (
        <NavSection navConfig={hostNavConfig} />
      )
    }
    if (userRole > 2 && userRole < 4) {
      return (<NavSection navConfig={clientNavConfig} />)
    }
  }
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 5.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src={'/static/mock-images/avatars/avatar_default.jpg'} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {UserName} - {UserCompany}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {UserRole}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>
      {getNav()}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
