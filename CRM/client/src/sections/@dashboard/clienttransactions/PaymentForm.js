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
  const [product,setProduct] = useState({productId:0,productName:'',productCategory:'',productPrice:0});
  const ClientTransactionsSchema = Yup.object().shape({
    ReferenceNo : Yup.string().required('Reference Number is Required'),
    TransactionType: Yup.string().required('Transaction Type is Required'),
  });

  const defaultValues = {
    email_username: '',
    password: '',
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
  function favTutorial() {  
    const mylist = document.getElementById("myList");  
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;  
    }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
      
      <select id = "myList" onChange = "favTutorial()" >  
      <option> TRANSACTION TYPE</option>  
      <option> CASH </option>  
      <option> CHEQUE </option>  
      <option> ONLINE </option>
      </select>
        <RHFTextField name="ReferenceNo" label="ReferenceNo" />
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          PAY
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
