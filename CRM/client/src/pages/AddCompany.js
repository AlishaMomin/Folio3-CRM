import { Link as RouterLink } from 'react-router-dom';
import { useState ,useEffect} from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { AddCompanyForm } from '../sections/@dashboard/addcompany';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

// ----------------------------------------------------------------------

export default function AddCompany() {

  const [Title, setTitle] = useState('');
  const [Navigation,setNavigation] = useState("");
  useEffect(() => {
    if (parseInt(localStorage.getItem('ROLE'),10) === 1)
    {
      setTitle("Add Host Company")
    }
    else
    {
      setTitle("Add Client Company")
    }
  }, []);
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title={Title}>
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <img src="/static/illustrations/crm.jpg" alt="crm" />
          </SectionStyle>
        )}

    <AddCompanyForm />

      </RootStyle>
    </Page>
  );
}
