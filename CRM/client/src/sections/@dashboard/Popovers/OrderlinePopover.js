import { useRef, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, Button, IconButton,ListItemText } from '@mui/material';
import {useReactToPrint} from "react-to-print" ;
// components
import Iconify from '../../../components/Iconify';
import { PaymentForm } from '../clienttransactions';
import MenuPopover from '../../../components/MenuPopover';
import Orderline from '../../../pages/Orderline';

// ----------------------------------------------------------------------

export default function OrderlinePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const componentRef=useRef();
  const handleprint =useReactToPrint({
    content:()=>componentRef.current,
  });

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: "100%",
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <>
        
        <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
            <Iconify icon="eva:eye-outline" />
            </>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 1000,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Orderline/>
        {/* <Orderline ref={componentRef}/> */}
        <Button variant="contained" onClick= {handleprint} component={RouterLink} to="" startIcon={<Iconify icon="eva:plus-fill" />}>
            Print Invoice
          </Button>
        {/* <PaymentForm/> */}
      </MenuPopover>
    </>
  );
}
