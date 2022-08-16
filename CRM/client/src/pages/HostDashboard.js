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
    AppTasks,
    AppNewsUpdate,
    AppOrderTimeline,
    AppCurrentVisits,
    TimePeriodProgress,
    AppTrafficBySite,
    AppWidgetSummary,
    AppCurrentSubject,
    AppConversionRates,
} from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function HostDashboard() {
    const theme = useTheme();
    const [ClientInterest, setClientInterest] = useState([]);
    const [noOfOrders, setnoOfOrders] = useState(0);
    const [ProductsList, setProductsList] = useState([]);
    const [Sales, setSales] = useState(0);
    const [Products,setProducts] = useState([]);
    const [PaymentTypes,setPaymentTypes] = useState([]);
    const [Dates,setDates] = useState([]);
    const [SalesData,setSalesData] = useState([]);
    useEffect(() => {
        getData();
      }, []);
      const getData = async () => {
        try {
            const CompanyId = localStorage.getItem('ID');
            const response = await axios.get(`http://localhost:5000/company/${CompanyId}`);
            console.log("Data recieved");
            console.log(response.data);
            setClientInterest(response.data.ClientInterest);
            setProductsList(response.data.ProductsList);
            setnoOfOrders(response.data.orders);
            setSales(response.data.sales);
            setProducts(response.data.Products)
            setPaymentTypes(response.data.PaymentType)
            setDates(response.data.Dates)
            setSalesData(response.data.SalesData)
        } catch (err) {
          console.log(err);
        }
    }
    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Welcome to the Host Dashboard
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Sales" total={Sales} icon={'ant-design:android-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Clients" total={ClientInterest.length} color="info" icon={'ant-design:apple-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Orders" total={noOfOrders} color="warning" icon={'ant-design:windows-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Products" total={Products.length} color="error" icon={'ant-design:bug-filled'} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <TimePeriodProgress
                            title="Annual Sale"
                            chartLabels={Dates}
                            chartData={[
                                // {
                                //     name: 'Annual Sale',
                                //     type: 'bar',
                                //     fill: 'fill',
                                //     data: SalesData,
                                // },
                                {
                                    name: 'Annual Sale',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: SalesData,
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits
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
                        <AppConversionRates
                            title="Top Sold Products"
                            chartData={Products}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentSubject
                            title="Clients Interests"
                            chartLabels={ProductsList}
                            chartData={ClientInterest}
                            chartColors={[...Array(ProductsList.length)].map(() => theme.palette.text.secondary)}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
