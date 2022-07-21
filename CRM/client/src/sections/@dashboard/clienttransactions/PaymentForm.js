import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm ,Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function PaymentForm() {
  const navigate = useNavigate();
  const ClientTransactionsSchema = Yup.object().shape({
    ReferenceNo : Yup.string().required('Reference Number is Required'),
  });

  const defaultValues = {
    ReferenceNo: '',
    TransactionType: '',
  };

  const methods = useForm({
    resolver: yupResolver(ClientTransactionsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard/clienttransactions', { replace: true });
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <select name = "TransactionType">  
        <option value = "" >Transaction Type</option>
        <option value = "cash"> CASH </option>  
        <option value = "cheque"> CHEQUE </option>  
        <option value = "online"> ONLINE </option>
        </select>
        <RHFTextField name="ReferenceNo" label="Reference" />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          PAY
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
