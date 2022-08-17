import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Stack, IconButton, InputAdornment, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField} from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AddCompanyForm() {
    const navigate = useNavigate();

    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const phoneRegExp = /^923\d{9}$|^03\d{9}$/

    const CompanySchema = Yup.object().shape({
        Company: Yup.object().shape({
            Name: Yup.string().required('Company name required'),
            Type: Yup.number(),
            Isdelete: Yup.number(),
        }),

        Contact1: Yup.object().shape({
            Name: Yup.string().required('Full name required'),
            Email: Yup.string().email('Email must be a valid email address').required('Email is required'),
            ContactNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')

        }),
        Contact2: Yup.object().shape({
            Name: Yup.string().required('Full name required'),
            Email: Yup.string().email('Email must be a valid email address').required('Email is required'),
            ContactNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')

        })
    });

    const defaultValues = {
        Company: {
            Name: "",
            Type: parseInt(localStorage.getItem('ROLE'),10) - (1),
            Isdelete: 0,
            HostCompany: localStorage.getItem('ID'),
        },
        
        Contact1: {
            Name: '',
            Email: '',
            ContactNumber: '',
            Password:'1234',
            Role: parseInt(localStorage.getItem('ROLE'),10) + (1)
        },

        Contact2: {
            Name: '',
            Email: '',
            ContactNumber: '',
            Password:'1234',
            Role: parseInt(localStorage.getItem('ROLE'),10) + (1)
        }
    };

    const methods = useForm({
        resolver: yupResolver(CompanySchema),
        defaultValues,
    });

    const postData = async (body) => {
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        try {
            await axios.post("http://localhost:5000/user/addcompany", body)
                .then((response) => {
                    console.log("Data recieved");
                    console.log(response.data);
                    const results = response.data;
                    if (results.status)
                    {
                        if (results.type === '0'){
                            navigate('/admin/home', { replace: true });
                          }
                          else if (results.type === '1'){
                            navigate('/host/dashboard', { replace: true });
                          }
                    }
                    else
                    {
                        window.alert(results.message);
                    }
                })

        } catch (err) {
            console.log(err);
        }

    };

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        console.log(data);
        postData(data);
        
    };

    const ContentStyle = styled('div')(({ theme }) => ({
        maxWidth: 480,
        margin: 'auto',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(12, 0),
      }));
    return (
        <Container maxWidth="sm">
            <ContentStyle>
                <Typography variant="h4" gutterBottom style={{ textAlignVertical: "center", textAlign: "center", }}>
                    New Company
                </Typography>

                <Typography sx={{ color: 'text.secondary', mb: 1 }} style={{ textAlignVertical: "center", textAlign: "center", }}>Enter your details below.</Typography>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <RHFTextField name="Company.Name" label="Company name" />
                        <h3 style={{ textAlignVertical: "center", textAlign: "center", }}>Contact Person 1</h3>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <RHFTextField name="Contact1.Name" label="Full name" />
                        </Stack>
                        <RHFTextField name="Contact1.Email" label="Email address" />
                        <RHFTextField name="Contact1.ContactNumber" label="Phone Number" />
                        <h3 style={{ textAlignVertical: "center", textAlign: "center", }}>Contact Person 2</h3>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <RHFTextField name="Contact2.Name" label="Full name" />
                        </Stack>
                        <RHFTextField name="Contact2.Email" label="Email address" />
                        <RHFTextField name="Contact2.ContactNumber" label="Phone Number" />
                    </Stack>
                    <br />
                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        SUBMIT
                    </LoadingButton>
                </FormProvider>
            </ContentStyle>

        </Container>
    );
}