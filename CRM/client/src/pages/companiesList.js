import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import axios from 'axios';
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
import { DataGrid } from '@mui/x-data-grid'
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserMoreMenu } from '../sections/@dashboard/companiesList';
import {UserListHead,UserListToolbar,} from '../sections/@dashboard/frequentComponents';
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'Name', label: 'Company Name', alignRight: false },
  { id: 'User1Name', label: 'Contact Person 1', alignRight: false },
  { id: '' },
  { id: 'User2Name', label: 'Contact Person 2', alignRight: false },
  { id: '' },
  { id: 'Isdelete', label: 'Status',alignRight: false },
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

export default function CompaniesList() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  //-----------------------------------------------------
  const [Title, setTitle] = useState('');
  const [Navigation,setNavigation] = useState("");





  //------------------------------------------------------
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [Company, setCompany] = useState([]);
  /* eslint-disable no-debugger */ 
  // debugger
  useEffect(() => {
    console.log("Company ka data", Company);
    
    getData();
  }, []);
  const getData = async () => {
    let Urlo = "";
    if (parseInt(localStorage.getItem('ROLE'),10) === 1)
    {
      setTitle("Home")
      Urlo = "http://localhost:5000/company/h";
      setNavigation("/admin/addcompany"); 
    }
    else
    {
      const CompanyId = localStorage.getItem('ID');
      setTitle("Companies")
      Urlo = `http://localhost:5000/company/c/${CompanyId}`;
      setNavigation("/host/addcompany"); 
    }
    try {
       const response = await axios.get(Urlo)
          console.log("Data recieved");
          console.log(response.data);
          setCompany(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Company.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Company.length) : 0;

  const filteredUsers = applySortFilter(Company, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    
    <Page title={Title}>
      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {Title}
          </Typography>
          <Button variant="contained" component={RouterLink} to={Navigation} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Company
          </Button>
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
                  rowCount={Company.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    row.ID = row.id
                    row.User1Name = row.User[0].Name;
                    row.User2Name = row.User[1].Name;
                    row.User1ContactNumber = row.User[0].ContactNumber;
                    row.User2ContactNumber = row.User[1].ContactNumber;
                    if (row.Isdelete === '0' || row.Isdelete === "active")
                    {
                      row.Isdelete = "active"
                    }
                    else
                    {
                      row.Isdelete = "banned"
                    }
                    const {Id,Name,User1Name,User1ContactNumber,User2Name,User2ContactNumber,Isdelete} = row;
                    const isItemSelected = selected.indexOf(Name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={Id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                        {/* <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, Name)} /> */}
                        </TableCell>
                        <TableCell align="left">{Name}</TableCell>
                        {/* <TableCell align="left">{noofclient}</TableCell> */}
                        <TableCell align="left">{User1Name}</TableCell>
                        <TableCell align="left">{User1ContactNumber}</TableCell>
                        <TableCell align="left">{User2Name}</TableCell>
                        <TableCell align="left">{User2ContactNumber}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(Isdelete === "banned" && 'error') || 'success'}>
                           {Isdelete}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu 
                          ID={Id}
                          action={Isdelete}
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
            count={Company.length}
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
