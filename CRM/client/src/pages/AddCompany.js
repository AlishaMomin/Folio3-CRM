import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Stack, IconButton, InputAdornment } from '@mui/material';

// sections
import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
// components
import Iconify from "../components/Iconify";
import { FormProvider, RHFTextField, RHFCheckbox } from "../components/hook-form";
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// hooks
import useResponsive from '../hooks/useResponsive';



// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    height: "100%",
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function AddCompany() {
    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');
    const navigate = useNavigate();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const CompanySchema = Yup.object().shape({
        CompanyName: Yup.string().required('Company name required'),
        FirstNameC1: Yup.string().required('First name required'),
        LastNameC1: Yup.string().required('Last name required'),
        EmailC1: Yup.string().email('Email must be a valid email address').required('Email is required'),
        PhoneC1: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        FirstNameC2: Yup.string().required('First name required'),
        LastNameC2: Yup.string().required('Last name required'),
        EmailC2: Yup.string().email('Email must be a valid email address').required('Email is required'),
        PhoneC2: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    });

    const defaultValues = {
        CompanyName: '',
        FirstNameC1: '',
        LastNameC1: '',
        EmailC1: '',
        PhoneC1: '',
        FirstNameC2: '',
        LastNameC2: '',
        EmailC2: '',
        PhoneC2: ''
    };

    const methods = useForm({
        resolver: yupResolver(CompanySchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async () => {
        navigate('/dashboard', { replace: true });
    };


    return (
        <Page title="Add Host Company">
            <RootStyle>
                
                {mdUp && (
                    <SectionStyle>
                        <img src="/static/illustrations/bg.jpg" alt="crm" />
                    </SectionStyle>
                )}

                <Container maxWidth="sm">
                    <ContentStyle>
                        <Typography variant="h4" gutterBottom style={{ textAlignVertical: "center", textAlign: "center", }}>
                            New Company
                        </Typography>

                        <Typography sx={{ color: 'text.secondary', mb: 1 }} style={{ textAlignVertical: "center", textAlign: "center", }}>Enter your details below.</Typography>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2}>
                                <RHFTextField name="CompanyName" label="Company name" />
                                <h3 style={{ textAlignVertical: "center", textAlign: "center", }}>Contact Person 1</h3>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <RHFTextField name="FirstNameC1" label="First name" />
                                    <RHFTextField name="LastNameC1" label="Last name" />
                                </Stack>
                                <RHFTextField name="EmailC1" label="Email address" />
                                <RHFTextField name="PhoneC1" label="Phone Number" />
                                <h3 style={{ textAlignVertical: "center", textAlign: "center", }}>Contact Person 2</h3>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <RHFTextField name="FirstNameC2" label="First name" />
                                    <RHFTextField name="LastNameC2" label="Last name" />
                                </Stack>
                                <RHFTextField name="EmailC2" label="Email address" />
                                <RHFTextField name="PhoneC2" label="Phone Number" />
                            </Stack>
                            <br/>
                            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                                SUBMIT
                            </LoadingButton>
                        </FormProvider>
                    </ContentStyle>

                </Container>

            </RootStyle>
        </Page>
    );
}
