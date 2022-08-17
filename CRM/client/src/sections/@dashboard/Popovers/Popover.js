import { useRef, useState } from 'react';
import {useReactToPrint} from "react-to-print" ;
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, Button, IconButton,ListItemText ,Tooltip} from '@mui/material';

// components
import Iconify from '../../../components/Iconify';
import { PaymentForm } from '../clienttransactions';
import MenuPopover from '../../../components/MenuPopover';
import Orderline from '../../../pages/Orderline';

// ----------------------------------------------------------------------
Popover.propTypes = {
  ID: PropTypes.number,
  STATUS:PropTypes.string,
};
export default function Popover({ID,STATUS}) {
  const anchorRef = useRef(null);
  const [openOrderline, setOpenOrderline] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  console.log(ID,"OrderlinePopover")
  const handleOpenOrderline = () => {
    setOpenOrderline(true);
  };

  const handleOpenPayment = () => {
    setOpenPayment(true);
  };

  const handleClose = () => {
    setOpenOrderline(false);
    setOpenPayment(false);
  };
  
  const paymenticon = () =>{
    if (parseInt(localStorage.getItem('ROLE'),10) === 3 && STATUS === 'unpaid')
    {
      return (
        <Tooltip title="Pay Order">
        <IconButton
          ref={anchorRef}
          onClick={handleOpenPayment}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(openPayment && {
              bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
            }),
          }}
        >
            <Iconify icon="fa6-brands:cc-amazon-pay"/>
        </IconButton>
      </Tooltip>
      )
    }
  }
  return (
    <>
    <Tooltip title="View Details">
        <IconButton
          ref={anchorRef}
          onClick={handleOpenOrderline}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(openOrderline && {
              bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
            }),
          }}
        >
            <Iconify icon="eva:eye-outline" />
        </IconButton>
      </Tooltip>
      {paymenticon()}
      <MenuPopover
        open={openOrderline}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 1000,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Orderline ID = {ID}/>
      </MenuPopover>
      <MenuPopover
        open={openPayment}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 360,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <PaymentForm ID = {ID}/>
      </MenuPopover>
    </>
  );
}
