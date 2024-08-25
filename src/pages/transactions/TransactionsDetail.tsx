import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  OutlinedInput,
  InputAdornment,
  SelectChangeEvent,
  Box,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { TransactionsService } from '../../shared/services/api/transactions/TransactionsService';
import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

interface IFormData {
  transaction_situation: string;
  transaction_date: Date;
  transaction_arrival_date: Date;
  customer_first_name: string;
  customer_phone: string;
  item_name: string;
  item_brand: string;
  item_model_chassis: string;
  transaction_technical_report: string;
  transaction_defect_description: string;
  transaction_service_total: number;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  transaction_situation: yup.string().required(),
  transaction_date: yup.date().required(),
  transaction_arrival_date: yup.date().required(),
  customer_first_name: yup.string().required(),
  customer_phone: yup.string().required(),
  item_name: yup.string().required(),
  item_brand: yup.string().required(),
  item_model_chassis: yup.string().required(),
  transaction_technical_report: yup.string().required(),
  transaction_defect_description: yup.string().required(),
  transaction_service_total: yup.number().required(),
});

export const TransactionsDetail: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(formValidationSchema),
  });

  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const handleSave = (data: IFormData) => {
    console.log('INIT', data);

    if (id === 'nova') {
      console.log('dadosValidados', data);
      TransactionsService.create(data).then((result) => {
        setIsLoading(false);
      });
    }
  };
  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Novo Pré-orçamento' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe aoClicarEmSalvar={handleSubmit(handleSave)} />
      }
    >
      <Box
        margin={1}
        display="flex"
        flexDirection="column"
        component={Paper}
        variant="outlined"
      >
        <Grid container direction="column" padding={2} spacing={2}>
          {isLoading && (
            <Grid item>
              <LinearProgress variant="indeterminate" />
            </Grid>
          )}
          <Grid item>
            <Typography variant="h6">Geral</Typography>
          </Grid>

          <Grid container item direction="row" spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
              <FormControl
                sx={{ minWidth: 200 }}
                error={!!errors.transaction_situation}
              >
                <InputLabel>Status</InputLabel>
                <Controller
                  name="transaction_situation"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Status">
                      <MenuItem value="">
                        <em>Nenhum</em>
                      </MenuItem>
                      <MenuItem value={15}>Aguardando</MenuItem>
                      <MenuItem value={10}>Aprovado</MenuItem>
                      <MenuItem value={20}>Cancelado</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>
                  {errors.transaction_situation?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

          
            <Grid container item direction="row" spacing={2}>
          
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <Controller
                  name="transaction_date"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <DatePicker
                      {...field}
                      value={value ? moment(value) : null}
                      onChange={(date: Moment | null) => onChange(date ? date.toDate() : null)}
                      sx={{ width: '100%' }}
                      label="Data Transação"
                      format="DD-MM-YYYY"
                      slotProps={{
                        textField: {
                          error: !!errors.transaction_date,
                          helperText: errors.transaction_date
                            ? errors.transaction_date.message
                            : null,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <Controller
                  name="transaction_arrival_date"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <DatePicker
                      {...field}
                      format="DD-MM-YYYY"
                      value={value ? moment(value, 'DD-MM-YYYY') : null}
                      onChange={(date: Moment | null) => onChange(date ? date.toDate() : null)}
                      sx={{ width: '100%' }}
                      label="Previsão de chegada"
                      slotProps={{
                        textField: {
                          error: !!errors.transaction_arrival_date,
                          helperText: errors.transaction_arrival_date
                            ? errors.transaction_arrival_date.message
                            : null,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <TextField
                  fullWidth
                  label="Cliente"
                  disabled={isLoading}
                  {...register('customer_first_name')}
                  error={!!errors.customer_first_name}
                  helperText={errors.customer_first_name?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <TextField
                  fullWidth
                  label="Telefone/Celular"
                  disabled={isLoading}
                  {...register('customer_phone')}
                  error={!!errors.customer_phone}
                  helperText={errors.customer_phone?.message}               />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <TextField
                  fullWidth
                  label="Produto"
                  disabled={isLoading}
                  {...register('item_name')}
                  error={!!errors.item_name}
                  helperText={errors.item_name?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <TextField
                  fullWidth
                  label="Marca"
                  disabled={isLoading}
                  {...register('item_brand')}
                  error={!!errors.item_brand}
                  helperText={errors.item_brand?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <TextField
                  fullWidth
                  label="Modelo + Chassis"
                  disabled={isLoading}
                  {...register('item_model_chassis')}
                  error={!!errors.item_model_chassis}
                  helperText={errors.item_model_chassis?.message}
                />
              </Grid>

            </Grid>
           

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <TextField
                  fullWidth
                  multiline
                  label="Descrição do cliente"
                  disabled={isLoading}
                  {...register('transaction_defect_description')}
                  error={!!errors.transaction_defect_description}
                  helperText={errors.transaction_defect_description?.message}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <TextField
                  fullWidth
                  multiline
                  label="Laudo técnico"
                  disabled={isLoading}
                  {...register('transaction_technical_report')}
                  error={!!errors.transaction_technical_report}
                  helperText={errors.transaction_technical_report?.message}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Total (Serviço + Peças)"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  inputProps={{
                    min: 0,  // Limita para valores positivos
                    step: '0.01',  // Permite casas decimais
                  }}
                  disabled={isLoading}
                  {...register('transaction_service_total')}
                  error={!!errors.transaction_service_total}
                  helperText={errors.transaction_service_total?.message}
                />
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
