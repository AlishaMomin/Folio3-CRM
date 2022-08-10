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
// ----------------------------------------------------------------------

export default function SignInForm() {
  const navigate = useNavigate();

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
  const postData = async (body) => {
    console.log(body);
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    try {
      await axios.post("http://localhost:5000/auth/login", body)
        .then((response) => {
          console.log("Data recieved");
          const results = response.data; 

          localStorage.setItem('ROLE',response.data[0].roleId);
          localStorage.setItem('ID',response.data[0].companyId);
          // condition to check roles
          if (response.data[0].roleId > 0 && response.data[0].roleId <2){
            navigate('/dashboard/AdminHome', { replace: true });
          }
          else if (response.data[0].roleId > 1 && response.data[0].roleId <3){
            navigate('/dashboard/HostDashboard', { replace: true });
          }
          else if (response.data[0].roleId > 2 && response.data[0].roleId <4){
            navigate('/dashboard/ClientDashboard', { replace: true });
          }
        })

    } catch (err) {
      console.log(err);
      window.alert('Incorrect Credential');

      // popover -> user not found
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
