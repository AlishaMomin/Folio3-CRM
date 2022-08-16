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
    AppWebsiteVisits,
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
                        <AppWebsiteVisits
                            title="Website Visits"
                            subheader="(+43%) than last year"
                            chartLabels={[
                                '2003/01/01',
                                '2003/02/01',
                                '2003/03/01',
                                '2003/04/01',
                                '2003/05/01',
                                '2003/06/01',
                                '2003/07/01',
                                '2003/08/01',
                                '2003/09/01',
                                '2003/10/01',
                                '2003/11/01',
                            ]}
                            chartData={[
                                {
                                    name: 'Team A',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                                },
                                // {
                                //     name: 'Team B',
                                //     type: 'area',
                                //     fill: 'gradient',
                                //     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                                // },
                                // {
                                //     name: 'Team C',
                                //     type: 'line',
                                //     fill: 'solid',
                                //     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                                // },
                                // {
                                //     name: 'Team D',
                                //     type: 'line',
                                //     fill: 'solid',
                                //     data: [23, 34, 39, 41, 38, 77, 84, 26, 59, 36, 39],
                                // },
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
