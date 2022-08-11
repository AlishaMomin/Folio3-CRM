import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import OrderlinePopover from '../Popovers/OrderlinePopover';

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  ID: PropTypes.number,
};
export default function UserMoreMenu({ID}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log(ID,"UserMoreMenu")
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        
      >
        
        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          
          {/* <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} /> */}
          <OrderlinePopover 
          ID = {ID}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
