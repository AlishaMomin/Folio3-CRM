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
    const [noOfClients, setnoOfClients] = useState(0);
    const [noOfOrders, setnoOfOrders] = useState(0);
    const [noOfProducts, setnoOfProducts] = useState(0);
    const [Sales, setSales] = useState(0);
    useEffect(() => {
        getData();
      }, []);
      const getData = async () => {
        try {
            const CompanyId = localStorage.getItem('ID');
            const response = await axios.get(`http://localhost:5000/company/${CompanyId}`);
            console.log("Data recieved");
            console.log(response.data);
            setnoOfClients(response.data.clients);
            setnoOfProducts(response.data.products);
            setnoOfOrders(response.data.orders);
            setSales(response.data.sales);
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
                        <AppWidgetSummary title="Clients" total={noOfClients} color="info" icon={'ant-design:apple-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Orders" total={noOfOrders} color="warning" icon={'ant-design:windows-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Products" total={noOfProducts} color="error" icon={'ant-design:bug-filled'} />
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
                            title="Current Visits"
                            chartData={[
                                { label: 'America', value: 4344 },
                                { label: 'Asia', value: 5435 },
                                { label: 'Europe', value: 1443 },
                                { label: 'Africa', value: 4443 },
                            ]}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.chart.blue[0],
                                theme.palette.chart.violet[0],
                                theme.palette.chart.yellow[0],
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                            title="Conversion Rates"
                            subheader="(+43%) than last year"
                            chartData={[
                                { label: 'Italy', value: 400 },
                                { label: 'Japan', value: 430 },
                                { label: 'China', value: 448 },
                                { label: 'Canada', value: 470 },
                                { label: 'France', value: 540 },
                                { label: 'Germany', value: 580 },
                                { label: 'South Korea', value: 690 },
                                { label: 'Netherlands', value: 1100 },
                                { label: 'United States', value: 1200 },
                                { label: 'United Kingdom', value: 1380 },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentSubject
                            title="Current Subject"
                            chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
                            chartData={[
                                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                            ]}
                            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
