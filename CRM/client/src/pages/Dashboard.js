// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useState,useEffect } from 'react';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
    PaymentTypesWidget,
    TimePeriodProgress,
    AppWidgetSummary,
    ClientInterestsWidget,
    TopProductsWidget,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function Dashboard() {
    const theme = useTheme();
    const [Title, setTitle] = useState('');

    const [ProductsList, setProductsList] = useState([]);

    const [Widget1Title,setWidget1Title] = useState('')

    const [Widget2Title,setWidget2Title] = useState('')

    const [Widget3Title,setWidget3Title] = useState('')

    const [Widget4Title,setWidget4Title] = useState('')

    const [Widget1, setWidget1] = useState(0);

    const [Widget2,setWidget2] = useState('')

    const [Widget3,setWidget3] = useState('')

    const [Widget4,setWidget4] = useState('')

    const [TimePeriodProgressTitle,setTimePeriodProgressTitle] = useState('');

    const [TimePeriodProgressData,setTimePeriodProgressData] = useState([]);

    const [TopProductsTitle,setTopProductsTitle] = useState([]);

    const [TopProducts,setTopProducts] = useState([]);

    const [PaymentTypes,setPaymentTypes] = useState([]);

    const [Products,setProducts] = useState([]);

    const [ClientInterest, setClientInterest] = useState([]);

    const [PaymentStatus, setPaymentStatus] = useState([]);

    const [Dates,setDates] = useState([]);


    useEffect(() => {
        getData();
      }, []);
      const getData = async () => {
        try {
            let URL = "";
            const CompanyId = localStorage.getItem('ID');
            if (parseInt(localStorage.getItem('ROLE'),10) === 2)
            {
                URL = `http://localhost:5000/company/hd/${CompanyId}`;
                setTitle('Host Dashboard')
                setWidget1Title('Total Sale');
                setWidget2Title('Clients')
                setWidget4Title('Products');
                setTopProductsTitle('Sold Products')
                setTimePeriodProgressTitle('Monthly Sale')
            }
            else if (parseInt(localStorage.getItem('ROLE'),10) === 3)
            {
                URL = `http://localhost:5000/company/cd/${CompanyId}`;
                setTitle('Client Dashboard')
                setWidget1Title('Total Purchase');
                setWidget2Title('Payable Orders')
                setWidget4Title('OverDue Orders');
                setTopProductsTitle('Bought Products')
                setTimePeriodProgressTitle('Monthly Purchase')
                
            }
            const response = await axios.get(URL);
            if (parseInt(localStorage.getItem('ROLE'),10) === 2)
            {
                setWidget1(response.data.sales);
                setWidget2(response.data.ClientInterest.length)
                setWidget4(response.data.Products.length)
                setTimePeriodProgressData(response.data.SalesData);
                setClientInterest(response.data.ClientInterest);
                setProductsList(response.data.ProductsList);
                
            }
            else if (parseInt(localStorage.getItem('ROLE'),10) === 3)
            {
                setWidget1(response.data.purchase);
                setWidget2(response.data.unpaidOrders)
                setWidget4(response.data.overdueOrders)
                setTimePeriodProgressData(response.data.PurchaseData);
                setPaymentStatus(response.data.paymentStatus)
            }
            console.log("Data recieved");
            setWidget3Title('Orders')
            setWidget3(response.data.orders);
            setPaymentTypes(response.data.PaymentType);
            setDates(response.data.Dates);
            setTopProducts(response.data.Products);
        } catch (err) {
          console.log(err);
        }
    }
    const Grid4 = () => {
        if (parseInt(localStorage.getItem('ROLE'),10) === 2)
        {
            return (
                <Grid item xs={12} md={6} lg={4}>
                <ClientInterestsWidget
                    title="Clients Interests"
                    chartLabels={ProductsList}
                    chartData={ClientInterest}
                    chartColors={[...Array(ProductsList.length)].map(() => theme.palette.text.secondary)}
                />
            </Grid>
            )
        }
        if (parseInt(localStorage.getItem('ROLE'),10) === 3)
        {
            return (
                <Grid item xs={12} md={6} lg={4}>
                        <PaymentTypesWidget
                            title="Payment Status"
                            chartData={PaymentStatus}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.chart.blue[0],
                                theme.palette.chart.violet[0],
                            ]}
                        />
                    </Grid>
            )
        }
    }
    return (
        <Page title={Title}>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Welcome to the Dashboard
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={Widget1Title} total={Widget1} icon={'ant-design:android-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={Widget2Title} total={Widget2} color="info" icon={'ant-design:apple-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={Widget3Title} total={Widget3} color="warning" icon={'ant-design:windows-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title={Widget4Title} total={Widget4} color="error" icon={'ant-design:bug-filled'} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <TimePeriodProgress
                            title={TimePeriodProgressTitle}
                            chartLabels={Dates}
                            chartData={[
                                {
                                    name: TimePeriodProgressTitle,
                                    type: 'area',
                                    fill: 'gradient',
                                    data: TimePeriodProgressData,
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <PaymentTypesWidget
                            title="Payment Type"
                            chartData={PaymentTypes}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.chart.blue[0],
                                theme.palette.chart.violet[0],
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <TopProductsWidget
                            title={TopProductsTitle}
                            chartData={TopProducts}
                        />
                    </Grid>
                    {Grid4()}
                </Grid>
            </Container>
        </Page>
    );
}
