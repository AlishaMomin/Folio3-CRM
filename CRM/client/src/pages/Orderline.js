import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useRef, forwardRef, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead } from '../sections/@dashboard/frequentComponents';

// mock
// import USERLIST from '../_mock/orderline';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  //   { id: 'name', label: 'name', alignRight: false },  
  { id: 'ProductName', label: 'Product', alignRight: false },
  { id: 'Quantity', label: 'Quantity', alignRight: false },
  { id: 'PerUnitPrice', label: 'Price Per Unit', alignRight: false },
  { id: 'Amount', label: 'Amount', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array ? array.map((el, index) => [el, index]) : [];
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis ? stabilizedThis.map((el) => el[0]) : [];
}

Orderline.propTypes = {
  ID: PropTypes.number,
};
export default function Orderline({ ID }) {
  const [page, setPage] = useState(0);

  const [TotalAmount, setTotalAmount] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [OrderLine, setOrderLine] = useState([]);
  useEffect(() => {
    getData();
    console.log("Orderline ka data", OrderLine);
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/order/${ID}`)
      console.log("Data recieved");
      console.log(response.data);
      setTotalAmount(response.data.TotalAmount);
      setOrderLine(response.data.Orderline);
    } catch (err) {
      console.log(err);
    }
  }


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = OrderLine ? OrderLine.map((n) => n.ProductName) : [];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, ProductName) => {
    const selectedIndex = selected.indexOf(ProductName);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ProductName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Orderline.length) : 0;

  const filteredUsers = applySortFilter(OrderLine, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const componentRef = useRef();
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    // <Page title="Orderline">
    <Page ref={componentRef} title="Order" style={{ backgroundColor: "#F8F8F8" }}>
      <Container>
        <Typography variant="h4" gutterBottom style={{ marginLeft: "13px" }}>
          Order
        </Typography>

        <Card>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={OrderLine ? OrderLine.length : 0}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    row.ProductName = row.Product.Name
                    const { id, ProductName, Quantity, PerUnitPrice, Amount, } = row;
                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, Name)} /> */}
                        </TableCell>
                        <TableCell align="left">{ProductName}</TableCell>
                        <TableCell align="left">{Quantity}</TableCell>
                        <TableCell align="left">$ {PerUnitPrice}</TableCell>
                        <TableCell align="left">$ {Amount}</TableCell>

                        {/* <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell> */}
                      </TableRow>



                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={OrderLine ? OrderLine.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <div>
          &nbsp;
        </div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
            Total amount = $ {TotalAmount}
          </Typography>
          <Button variant="contained" onClick={handleprint} startIcon={<Iconify icon="eva:plus-fill" />}>
            Print Invoice
          </Button>
        </Stack>
      </Container>
    </Page>
  );
}
