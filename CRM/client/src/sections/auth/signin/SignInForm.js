import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function SignInForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const SignInSchema = Yup.object().shape({
    Email: Yup.string().required('Email is required'),
    Password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    Email: '',
    Password: '',
  };

  const methods = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data,"Data from siginform.js");
    // postData(data);
    try {
      await login(data);
      // condition to check roles
      if (parseInt(localStorage.getItem('ROLE'),10) === 1){
        navigate('/admin/home', { replace: true });
      }
      else if (parseInt(localStorage.getItem('ROLE'),10) === 2){
        navigate('/host/dashboard', { replace: true });
      }
      else if (parseInt(localStorage.getItem('ROLE'),10) === 3){
        navigate('/client/dashboard', { replace: true });
      }
    } catch (e) {
      // setLoading(false);
    }

  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>

        <RHFTextField name="Email" label="Email address" id="Email" />

        <RHFTextField
          name="Password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Sign In
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
