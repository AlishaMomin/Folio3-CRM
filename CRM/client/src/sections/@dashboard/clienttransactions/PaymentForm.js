import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

PaymentForm.propTypes = {
  ID: PropTypes.number,
};
export default function PaymentForm({ ID }) {
  const navigate = useNavigate();
  const ClientTransactionsSchema = Yup.object().shape({
    TransactionType: Yup.string().oneOf(["cash", "online", "cheque"]).required('Transaction Type is Required'),
    // ReferenceNo: Yup.string().required('Reference Number is Required'),
    ReferenceNo: Yup.string()
    .when(
        'TransactionType',
      {
        is: 'cash',
        then: Yup.string().notRequired(),
        otherwise: Yup.string().required(),
      }
    )
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
    register,
    formState: { isSubmitting, errors },
    control,
    setValue,
  } = methods;

  const updateData = async (body) => {
    try {
        await axios.patch(`http://localhost:5000/order/${ID}`, body)
            .then((response) => {
                console.log("Data recieved");
                console.log(response.data);
                alert("Status updated successfully");
                window.location.reload();
            })

    } catch (err) {
        console.log(err);
    }
  }
  const onSubmit = async (data) => {
    data.InvoiceStatus = 'paid';
    updateData(data);
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
