import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {UserListHead,UserListToolbar} from '../sections/@dashboard/frequentComponents';
import {Popover} from '../sections/@dashboard/Popovers';
// ----------------------------------------------------------------------

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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.Name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Transactions() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [Title, setTitle] = useState('');

  const [TABLE_HEAD, setTableHead] = useState([]);

  
  const TABLE_HEADHOST = [
    { id: 'ClientName', label: 'Client Name', alignRight: false },  
    { id: 'Name', label: 'Order', alignRight: false },  
    { id: 'TotalAmount', label: 'Total Amount', alignRight: false },
    { id: 'DateOfOrder', label: 'Date Of Order', alignRight: false },
    { id: 'LastDate', label: 'Last Date', alignRight: false },
    { id: 'InvoiceStatus', label: 'Status', alignRight: false },
    { id: '' },
  ];

  const TABLE_HEADCLIENT = [
    { id: 'Name', label: 'Order', alignRight: false },  
    { id: 'TotalAmount', label: 'Total Amount', alignRight: false },
    { id: 'DateOfOrder', label: 'Date Of Order', alignRight: false },
    { id: 'LastDate', label: 'Last Date', alignRight: false },
    { id: 'InvoiceStatus', label: 'Status', alignRight: false },
    { id: '' },
  ];
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [Transactions, setTransactions] = useState([]);
    useEffect(() => {
        console.log("Product ka data", Transactions);

        getData();
    }, []);
    const getData = async () => {
    let Urlo = "";
    const CompanyId = localStorage.getItem('ID');
    if (parseInt(localStorage.getItem('ROLE'),10) === 2)
    {
      setTitle("Recievables")
      Urlo = `http://localhost:5000/order/h/${CompanyId}`;
      setTableHead(TABLE_HEADHOST)
    }
    if (parseInt(localStorage.getItem('ROLE'),10) === 3)
    {
      setTitle("Transactions")
      Urlo = `http://localhost:5000/order/c/${CompanyId}`;
      setTableHead(TABLE_HEADCLIENT)
    }
    try {
        const response = await axios.get(Urlo);
          console.log("Data recieved");
          console.log(response.data);
          setTransactions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Transactions.map((n) => n.Name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, Name) => {
    const selectedIndex = selected.indexOf(Name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Transactions.length) : 0;

  const filteredUsers = applySortFilter(Transactions, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  return (
    <Page title={Title}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          {Title}
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={Transactions.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    if (parseInt(localStorage.getItem('ROLE'),10) === 2)
                    {
                      row.ClientName = row.Buyer.Company.Name;
                    }
                    const { Id,Name, TotalAmount,  DateOfOrder, LastDate, InvoiceStatus,ClientName} = row;
                    const isItemSelected = selected.indexOf(Name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={Id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}>

                        <TableCell padding="checkbox">
                        {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, Name)} /> */}
                        </TableCell>
                        {(() => {
                          if (parseInt(localStorage.getItem('ROLE'),10) === 2) {
                            return (  
                              <TableCell align="left">{ClientName}</TableCell>      
                            )
                          }
                        })()}
                        <TableCell align="left">{Name}</TableCell>
                        <TableCell align="left">{TotalAmount}</TableCell>
                        <TableCell align="left">{DateOfOrder}</TableCell>
                        <TableCell align="left">{LastDate}</TableCell>                     
                        <TableCell align="left" >
                          <Label variant="ghost" color={(InvoiceStatus === 'unpaid' && 'error') || 'success'}>
                            {sentenceCase(InvoiceStatus)}
                          </Label>
                        </TableCell>

                        <TableCell align="left" padding= "default" size = "string">
                          {/* <UserMoreMenu  
                          ID = {Id}
                          /> */}
                          <Popover 
                          ID = {Id} 
                          STATUS = {InvoiceStatus}
                          />
                        </TableCell>
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
            count={Transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
