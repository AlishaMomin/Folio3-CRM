import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function AddHostCompanyForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        companyName: Yup.string().required('Company name required'),
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        phone: Yup.string().required('phone is required'),
    });

    const defaultValues = {
        companyName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        remember: true,
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <h3>Person 1</h3>
            <Stack spacing={2}>
                <RHFTextField name="companyName" label="Company name" />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <RHFTextField name="firstName" label="First name" />
                    <RHFTextField name="lastName" label="Last name" />
                </Stack>
                <RHFTextField name="email" label="Email address" />

                <RHFTextField name="phone" label="phone" />
            </Stack>

            <h3>Person 2</h3>
            <Stack spacing={2}>
                <RHFTextField name="companyName" label="Company name" />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <RHFTextField name="firstName" label="First name" />
                    <RHFTextField name="lastName" label="Last name" />
                </Stack>
                <RHFTextField name="email" label="Email address" />

                <RHFTextField name="phone" label="phone" />
            </Stack>


            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                SUBMIT
            </LoadingButton>
        </FormProvider>
    );
}
