import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function PaymentForm() {
  const navigate = useNavigate();
  const ClientTransactionsSchema = Yup.object().shape({
    ReferenceNo: Yup.string().required('Reference Number is Required'),
    TransactionType: Yup.string().oneOf(["cash", "online", "cheque"]).required('Transaction Type is Required'),
  });

  const defaultValues = {
    ReferenceNo: '00-00',
    TransactionType: '',
  };

  const methods = useForm({
    resolver: yupResolver(ClientTransactionsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    control,
    setValue,
  } = methods;

  const onSubmit = async () => {
    navigate('/client/transactions', { replace: true });
  };

  const [Type, setType] = useState();
  const checker = async (e) => {
    setType(e.target.value)
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <div style={{ height: '30px', width: '100%' }}>
          <select name="TransactionType" {...register('TransactionType')} value={Type} onChange={checker} style={{ height: '30px', width: '100%', border: '1px solid 	#E0E0E0', borderRadius: '7px', color: "#787878", fontSize: '15px' }}>
            <option value="" >Transaction Type</option>
            <option value="cash"> CASH </option>
            <option value="cheque"> CHEQUE </option>
            <option value="online"> ONLINE </option>
          </select>
          {errors.TransactionType && <p style={{ color: "red", fontSize: '12px', marginLeft: "13px" }}>{errors.TransactionType.message}</p>}
        </div>


        {(() => {
          if (Type === "cheque" || Type === "online") {

            return (
              <RHFTextField name="ReferenceNo" label="Reference" />
            )
          }
        })()}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          PAY
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
