import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

UserMoreMenu.propTypes = {
  ID: PropTypes.number,
  action: PropTypes.string,
};
export default function UserMoreMenu({ ID, action }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = (e) => {
    console.log(ID,action)
    const updateIsDelete = {Isdelete:'1'};
    if (action === "banned")
    {
      updateIsDelete.Isdelete = '0';
    }
    
    try {
      axios.patch(`http://localhost:5000/company/${ID}`,updateIsDelete)
        .then((response) => {
          console.log("Data recieved");
          console.log(response.data);
          if (action === "banned")
          {
            alert("Company activated.");
          }
          else
          {
            alert("Company banned.");
          }
          window.location.reload();
        })

    } catch (err) {
      console.log(err);
    }

  };
  const popup = () => {
    if (action === "banned")
    {
      return (
      
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => {onSubmit()}}>
          <ListItemIcon>
            <Iconify icon="eva:bulb-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Activate" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      )
    }
    if (action === "active")
    {
      return (
      
        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => {onSubmit()}}>
          <ListItemIcon>
            <Iconify icon="eva:slash-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Ban" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      )
    }
  }
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
        {popup()}
      </Menu>
    </>
  );
}
