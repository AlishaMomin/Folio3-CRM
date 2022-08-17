import { useRef, useState, useEffect} from 'react';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';

import useAuth from '../../hooks/useAuth';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [UserEmail, setUserEmail] = useState('');
  const [UserName, setUserName] = useState('');
  const {logout} = useAuth();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  
  useEffect(() => {
     setUserEmail(localStorage.getItem('EMAILID'))
     setUserName(localStorage.getItem('Name'))
  }, []);

  const handleClose = () => {
    setOpen(null);
  };
  const goto = () => {
    logout();
    navigate("/signin");
  };
  
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={'/static/mock-images/avatars/avatar_default.jpg'} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {UserName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {UserEmail}
          </Typography>
        </Box>

        <MenuItem onClick = {goto} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
